/** @typedef {import('./types').AuctionItemNew} AuctionItemNew */
/** @typedef {import('./types').AuctionItemUpdate} AuctionItemUpdate */

import axios from "axios";

const domain = "csgoempire.com";
axios.defaults.headers.common["Authorization"] = `Bearer ${csgoempireApiKey}`;

export function getNextOffer(auctionHighestBid, auctionBidsCount) {
  if (!auctionBidsCount) return auctionHighestBid;
  let n = Math.round(auctionHighestBid * 0.01);
  return n < 1 && (n = 1), auctionHighestBid + n;
}

export function placeBidOnNewItems(biddingItems) {
  const requests = biddingItems.map((item) => {
    return axios.post(
      `https://${domain}/api/v2/trading/deposit/${item.id}/bid`,
      {
        bid_value: item.purchase_price,
      }
    );
  });

  Promise.allSettled(requests).then((results) => {
    results.forEach((result) => {
      if (result.status === "fulfilled") {
        const res = result.value.data;
        if (res.success) {
          console.log(`a_u: Updated bid on ${res.auction_data.id}`);
        }
      } else {
        console.error("a_u: Error:", result.reason.response.data);
      }
    });
  });

  // NOTE: the error DOES NOT contain auction data
  // Error: {
  //   success: false,
  //   message: 'This item has already been bid on for a higher amount (2).',
  //   message_localized: { key: 'auction.offer_already_placed' },
  //   data: { error_key: 'bid_already_placed', next_bid: 26 }
  // }
}

export function placeBidOnUpdateItems(matchedBiddingItems) {
  const requests = matchedBiddingItems.map((item) => {
    return axios.post(
      `https://${domain}/api/v2/trading/deposit/${item.id}/bid`,
      {
        bid_value: getNextOffer(
          item.auction_highest_bid,
          item.auction_number_of_bids
        ),
      }
    );
  });

  Promise.allSettled(requests).then((results) => {
    results.forEach((result) => {
      if (result.status === "fulfilled") {
        const res = result.value.data;
        if (res.success) {
          console.log(`a_u: Updated bid on ${res.auction_data.id}`);
        }
      } else {
        console.error("a_u: Error:", result.reason.response.data);
      }
    });
  });
}

export async function refreshUserData(userData, userDataRefreshedAt) {
  if (userDataRefreshedAt && userDataRefreshedAt > Date.now() - 15 * 1000) {
    return;
  }

  try {
    userData = (await axios.get(`https://${domain}/api/v2/metadata/socket`))
      .data;
    userDataRefreshedAt = Date.now();

    // let test = (await axios.get(`https://${domain}/api/v2/user/security/token`))
    //   .data;

    // console.log(test);
    return {
      userData: userData,
      userDataRefreshedAt: userDataRefreshedAt,
    };
  } catch (error) {
    console.log(`Failed to refresh user data: ${error.message}`);
  }
}

/**
 * Check if bidding items are still available
 * @param {AuctionItemNew[]} biddingItems - Array of auction items to check
 */
export async function checkBiddingItems(biddingItems) {
  const requests = biddingItems.map((item) => {
    return axios.get(`https://csgoempire.com/api/v2/trading/item/${item.id}`);
  });

  Promise.allSettled(requests).then((results) => {
    results.forEach((result) => {
      if (result.status === "fulfilled") {
        const res = result.value.data;
        if (res.success) {
          console.log(`checkBiddingItem: Updated bid on ${res}`);
        }
      } else {
        console.error("checkBiddingItem: ", result.reason);
      }
    });
  });
}
