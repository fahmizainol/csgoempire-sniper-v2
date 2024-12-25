/** @typedef {import('./types').AuctionItemNew} AuctionItemNew */
/** @typedef {import('./types').AuctionItemUpdate} AuctionItemUpdate */

import axios from "axios";
import { io } from "socket.io-client";
import csgoempire from "@api/csgoempire";
import marketItemNames from "./data/marketItemNames.json" assert { type: "json" };

const marketItemNamesVar = marketItemNames;
// Replace domain to '.gg' if '.com' is blocked
const domain = "csgoempire.com";

const socketEndpoint = `wss://trade.${domain}/trade`;

// Set the authorization header for all axios requests to the CSGOEmpire API Key
axios.defaults.headers.common["Authorization"] = `Bearer ${csgoempireApiKey}`;

async function refreshUserData() {
  if (userDataRefreshedAt && userDataRefreshedAt > Date.now() - 15 * 1000) {
    // refreshed less than 15s ago, should be still valid
    return;
  }

  try {
    // Get the user data from the socket
    // Token is valid 30s
    userData = (await axios.get(`https://${domain}/api/v2/metadata/socket`))
      .data;
    userDataRefreshedAt = Date.now();

    // let test = (await axios.get(`https://${domain}/api/v2/user/security/token`))
    //   .data;

    // console.log(test);
  } catch (error) {
    console.log(`Failed to refresh user data: ${error.message}`);
  }
}

function getNextOffer(auctionHighestBid, auctionBidsCount) {
  if (!auctionBidsCount) return auctionHighestBid;
  let n = Math.round(auctionHighestBid * 0.01);
  return n < 1 && (n = 1), auctionHighestBid + n;
}

/**
 * Place bids on new items
 * @param {string[]} ids - Array of new auction items
 */
async function placeBidOnNewItems(ids) {
  const requests = ids.map((item) => {
    return axios.post(
      `https://${domain}/api/v2/trading/deposit/${item.id}/bid`,
      {
        bid_value: item.purchase_price,
      }
    );
  });

  Promise.all(requests)
    .then((responses) => {
      // Handle all responses here
      responses.forEach((response) => {
        console.log(response.data);
        biddingItems.push(response.data);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

let userData = null;
let userDataRefreshedAt = null;

/** @type {AuctionItemNew[]} */
let biddingItems = [];

let bargainItemsCount = 0;

// Function for connecting to the web socket
async function initSocket() {
  console.log("Connecting to websocket...");

  try {
    await refreshUserData();

    // Initalize socket connection
    const socket = io(socketEndpoint, {
      transports: ["websocket"],
      path: "/s/",
      secure: true,
      rejectUnauthorized: false,
      reconnect: true,
      query: {
        uid: userData.user.id,
        token: userData.socket_token,
      },
      extraHeaders: { "User-agent": `${userData.user.id} API Bot` }, //this lets the server know that this is a bot
    });

    socket.on("connect", async () => {
      // Log when connected
      console.log(`Connected to websocket`);

      // Handle the Init event
      socket.on("init", async (data) => {
        if (data && data.authenticated) {
          console.log(`Successfully authenticated as ${data.name}`);

          // Emit the default filters to ensure we receive events
          socket.emit("filters", {
            price_max: 20000,
            // price_max: 30,
          });
        } else {
          await refreshUserData();
          // When the server asks for it, emit the data we got earlier to the socket to identify this client as the user
          socket.emit("identify", {
            uid: userData.user.id,
            model: userData.user,
            authorizationToken: userData.socket_token,
            signature: userData.socket_signature,
          });
        }
      });

      socket.on(
        "new_item",
        /** @param {AuctionItemNew[]} data */
        (data) => {
          //   console.log(`n_i: ${data}`);
          const bargainItems = data.filter((item) => {
            return (
              item.above_recommended_price < -3
              //  && marketItemNamesVar.includes(item.market_name)
            );
          });

          if (bargainItems.length === 0) {
            return;
          }

          // prettier-ignore
          console.log(`n_i: ${bargainItems.map((item) => { return { id: item.id, name: item.market_name, above_recommended_price: item.above_recommended_price, purchase_price: item.purchase_price }; })}`);

          // NOTE: Putting the bargainItems early so that if we missed the first bid, we can still catch the update
          biddingItems = [...biddingItems, ...bargainItems];

          console.log(`n_i: biddingItems`);
          // prettier-ignore
          console.log(`${biddingItems.map((item) => { return { id: item.id, name: item.market_name, above_recommended_price: item.above_recommended_price, purchase_price: item.purchase_price }; })}`);
        }
      );

      // BUG: Seems like the update event is catching the delete event too?
      // NOTE: After we placed the initial bid, the webpage doesnt display anything in the "Trades" tab. But
      // after like 2-3 minutes, we won the auction.
      socket.on(
        "auction_update",
        /** @param {AuctionItemUpdate[]} data */
        (data) => {
          // Check if theres any items currently bidding
          //   console.log(`a_u: ${data.map((item) => item.id)}`);
          if (biddingItems.length === 0) {
            return;
          }

          console.log(`a_u: biddingItems length: ${biddingItems.length}`);

          const auctionUpdateIds = new Set(
            data.map((item) => {
              return item.above_recommended_price < -3 ? item.id : null;
            })
          );

          if (!auctionUpdateIds) return;

          const matchedBiddingItems = biddingItems.filter((item) =>
            auctionUpdateIds.has(item.id)
          );

          console.log("a_u: matchedBiddingItems");
          // prettier-ignore
          console.log(`${biddingItems.map((item) => { return { id: item.id, name: item.market_name, above_recommended_price: item.above_recommended_price, purchase_price: item.purchase_price }; })}`);

          if (matchedBiddingItems.length === 0) return;
        }
      );
      socket.on(
        "deleted_item",
        /** @param {string[]} data */
        (data) => {
          //   console.log(`d_i: ${data}`);
          // BUG: Doesnt seem to delete all of the bidding items
          if (biddingItems.length === 0) return;

          const isBiddingItemsDeleted = biddingItems.some((item) =>
            data.includes(item.id)
          );

          if (!isBiddingItemsDeleted) return;

          biddingItems = biddingItems.filter((item) => !data.includes(item.id));

          console.log("d_i: Successfully deleted matched items");
        }
      );

      // NOTE: If we won the auction, this event will be emitted with "status_message" set to Sending, Sent,
      socket.on("trade_status", (data) =>
        console.log(`trade_status: ${JSON.stringify(data)}`)
      );
      // socket.on("updated_item", (data) =>
      //   console.log(`updated_item: ${JSON.stringify(data)}`)
      // );
      socket.on("disconnect", (reason) =>
        console.log(`Socket disconnected: ${reason}`)
      );
    });

    // Listen for the following event to be emitted by the socket in error cases
    socket.on("close", (reason) => console.log(`Socket closed: ${reason}`));
    socket.on("error", (data) => console.log(`WS Error: ${data}`));
    socket.on("connect_error", (data) => console.log(`Connect Error: ${data}`));
  } catch (e) {
    console.log(`Error while initializing the Socket. Error: ${e}`);
  }
}

initSocket();

// every 3 mins make a request
