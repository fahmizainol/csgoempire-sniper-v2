/** @typedef {import('./types').AuctionItemNew} AuctionItemNew */
/** @typedef {import('./types').AuctionItemUpdate} AuctionItemUpdate */

import axios from "axios";
import { io } from "socket.io-client";
import csgoempire from "@api/csgoempire";
import marketItemNames from "./data/marketItemNames.json" assert { type: "json" };
import {
  refreshUserData,
  placeBidOnNewItems,
  placeBidOnUpdateItems,
  getNextOffer,
  checkBiddingItems,
} from "./helpers.js";

const marketItemNamesVar = marketItemNames;

// Replace domain to '.gg' if '.com' is blocked
const domain = "csgoempire.com";
const socketEndpoint = `wss://trade.${domain}/trade`;
axios.defaults.headers.common["Authorization"] = `Bearer ${csgoempireApiKey}`;

let userData = null;
let userDataRefreshedAt = null;
/** @type {AuctionItemNew[]} */
let biddingItems = [];
let bargainItemsCount = 0;

// Function for connecting to the web socket
async function initSocket() {
  console.log("Connecting to websocket...");

  try {
    // prettier-ignore
    const result = await refreshUserData(userData, userDataRefreshedAt);
    if (result) {
      ({ userData, userDataRefreshedAt } = result);
    } else {
      // Handle the case where refreshUserData returns undefined
      console.error("refreshUserData returned undefined");
    }
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
      console.log(`Connected to websocket`);
      socket.on("init", async (data) => {
        if (data && data.authenticated) {
          console.log(`Successfully authenticated as ${data.name}`);

          // Emit the default filters to ensure we receive events
          socket.emit("filters", {
            price_max: 30000,
          });
        } else {
          // prettier-ignore
          const result = await refreshUserData(userData, userDataRefreshedAt);
          if (result) {
            ({ userData, userDataRefreshedAt } = result);
          } else {
            // Handle the case where refreshUserData returns undefined
            console.error("refreshUserData returned undefined");
          }
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
          const bargainItems = data.filter((item) => {
            return (
              item.above_recommended_price < -3
              //  && marketItemNamesVar.includes(item.market_name)
            );
          });

          if (bargainItems.length === 0) {
            return;
          }

          // NOTE: Putting the bargainItems early so that if we missed the first bid, we can still catch the update
          biddingItems = [...biddingItems, ...bargainItems];

          // placeBidOnNewItems(bargainItems);
        }
      );

      // BUG: Seems like the update event is catching the delete event too?
      // NOTE: After we placed the initial bid, the webpage doesnt display anything in the "Trades" tab. But
      // after like 2-3 minutes, we won the auction.
      // NOTE: Items are only deleted if its bought. If not it will not be deleted. This means that we need to
      // check the item after 2-3 minutes to see if it was bought and delete them from biddingItems.
      socket.on(
        "auction_update",
        /** @param {AuctionItemUpdate[]} data */
        (data) => {
          // Check if theres any items currently bidding
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
          console.log(matchedBiddingItems);

          if (matchedBiddingItems.length === 0) return;

          // placeBidOnUpdateItems(matchedBiddingItems);
        }
      );
      socket.on(
        "deleted_item",
        /** @param {string[]} data */
        (data) => {
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
      //   socket.on("updated_item", (data) =>
      //     console.log(`updated_item: ${JSON.stringify(data)}`)
      //   );
      socket.on("disconnect", (reason) =>
        console.log(`Socket disconnected: ${reason}`)
      );
    });

    socket.on("timesync", (data) =>
      console.log(`Timesync: ${JSON.stringify(data)}`)
    );
    // Listen for the following event to be emitted by the socket in error cases
    socket.on("close", (reason) => console.log(`Socket closed: ${reason}`));
    socket.on("error", (data) => console.log(`WS Error: ${data}`));
    socket.on("connect_error", (data) => console.log(`Connect Error: ${data}`));
  } catch (e) {
    console.log(`Error while initializing the Socket. Error: ${e}`);
  }
}

setInterval(() => checkBiddingItems(biddingItems), 3 * 60 * 1000);
initSocket();

// TODO: Add a check to see if the stuff in biddingItems is still valid every 3 minutes
