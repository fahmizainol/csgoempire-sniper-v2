/** @typedef {import('./types').AuctionItemNew} AuctionItemNew */
/** @typedef {import('./types').AuctionItemUpdate} AuctionItemUpdate */

import express from 'express'
import axios from 'axios'
import { io } from 'socket.io-client'
import { refreshUserData } from './helpers.js'

import { createServer } from 'http'
import { Server } from 'socket.io'
import { Mutex } from 'async-mutex'

const app = express()
const httpServer = createServer(app)
const ioServer = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
const port = 3000

const csgoempireApiKey = 'c16911a83495484949194e5e5200ab04'
const domain = 'csgoempire.com'
const socketEndpoint = `wss://trade.${domain}/trade`

const PRICE_MAX = 30000
const PRICE_MIN = 0
const REC_PRICE_NEW = 5
const REC_PRICE_UPDATE = 5

axios.defaults.headers.common['Authorization'] = `Bearer ${csgoempireApiKey}`

let userData = null
let userDataRefreshedAt = null

const biddingItemsMutex = new Mutex()

/** @type {AuctionItemNew[]} */
let biddingItems = []

function notifyClientsOfNewItems(newItems) {
  ioServer.emit('new_bidding_items', newItems)
}

// ioServer.on('connection', socket => {
//   console.log('📡 Client connected via Socket.IO')

//   // Send current biddingItems on connection
//   socket.emit('new_bidding_items', biddingItems)

//   socket.on('disconnect', () => {
//     console.log('Client disconnected')
//   })
// })

async function startSocketConnection() {
  try {
    const result = await refreshUserData(userData, userDataRefreshedAt)

    if (result) {
      ;({ userData, userDataRefreshedAt } = result)
    } else {
      console.error('refreshUserData returned undefined')
    }

    const socket = io(socketEndpoint, {
      transports: ['websocket'],
      path: '/s/',
      secure: true,
      rejectUnauthorized: false,
      reconnect: true,
      query: {
        uid: userData.user.id,
        token: userData.socket_token,
      },
      extraHeaders: {
        'User-agent': `${userData.user.id} API Bot`,
      },
    })

    socket.on('connect', async () => {
      console.log(`Connected to websocket`)
      socket.on('init', async data => {
        if (data && data.authenticated) {
          console.log(`Successfully authenticated as ${data.name}`)

          // Emit the default filters to ensure we receive events
          socket.emit('filters', {
            price_max: PRICE_MAX,
            price_min: PRICE_MIN,
          })
        } else {
          // prettier-ignore
          const result = await refreshUserData(userData, userDataRefreshedAt);
          if (result) {
            ;({ userData, userDataRefreshedAt } = result)
          } else {
            // Handle the case where refreshUserData returns undefined
            console.error('refreshUserData returned undefined')
          }
          // When the server asks for it, emit the data we got earlier to the socket to identify this client as the user
          socket.emit('identify', {
            uid: userData.user.id,
            model: userData.user,
            authorizationToken: userData.socket_token,
            signature: userData.socket_signature,
          })
        }
      })

      socket.on(
        'new_item',
        /** @param {AuctionItemNew[]} data */
        data => {
          biddingItemsMutex.runExclusive(() => {
            const bargainItems = data.filter(item => {
              return item.above_recommended_price < REC_PRICE_NEW
            })

            if (bargainItems.length === 0) return

            // Add new bargains to shared state
            biddingItems = [...biddingItems, ...bargainItems]

            // Notify front-end clients
            ioServer.emit('new_bidding_items', biddingItems)

            // Optional: place bids
            // placeBidOnNewItems(bargainItems)
          })
        },
      )

      socket.on(
        'auction_update',
        /** @param {AuctionItemUpdate[]} data */
        data => {
          biddingItemsMutex.runExclusive(() => {
            if (biddingItems.length === 0) return

            const filterData = data.filter(
              d => d.above_recommended_price < REC_PRICE_UPDATE,
            )

            const updatedAuctionMap = new Map(
              filterData.map(item => [item.id, item]),
            )

            if (updatedAuctionMap.size === 0) return

            // Safely update the fields
            biddingItems = biddingItems.map(bid => {
              if (!updatedAuctionMap.has(bid.id)) return bid
              return {
                ...bid,
                ...updatedAuctionMap.get(bid.id),
              }
            })

            console.log(biddingItems)

            // Notify clients
            ioServer.emit('new_bidding_items', biddingItems)

            // placeBidOnUpdateItems(...) if needed
          })
        },
      )

      socket.on(
        'deleted_item',
        /** @param {string[]} data */
        data => {
          biddingItemsMutex.runExclusive(() => {
            if (biddingItems.length === 0) return

            const isBiddingItemsDeleted = biddingItems.some(item =>
              data.includes(item.id),
            )

            if (!isBiddingItemsDeleted) return

            biddingItems = biddingItems.filter(item => !data.includes(item.id))

            console.log('d_i: Successfully deleted matched items')
          })
        },
      )

      // NOTE: If we won the auction, this event will be emitted with "status_message" set to Sending, Sent,
      socket.on('trade_status', data =>
        console.log(`trade_status: ${JSON.stringify(data)}`),
      )
      //   socket.on("updated_item", (data) =>
      //     console.log(`updated_item: ${JSON.stringify(data)}`)
      //   );
      socket.on('disconnect', reason =>
        console.log(`Socket disconnected: ${reason}`),
      )
    })

    socket.on('message', msg => {
      console.log('📨 Message from server:', msg)
    })

    socket.on('disconnect', () => {
      console.log('❌ Disconnected from socket server')
    })

    socket.on('connect_error', err => {
      console.error('⚠️ Socket connection error:', err.message)
    })
  } catch (error) {
    console.log(`Error while initializing the Socket. Error: ${error}`)
  }
}

app.get('/reconnect-socket', async (req, res) => {
  await startSocketConnection()
  res.send('Socket reconnected (if data was refreshed).')
})

app.get('/get-new-items', async (req, res) => {
  res.send(biddingItems)
})

httpServer.listen(port, async () => {
  console.log(`🚀 Express server running on http://localhost:${port}`)
  await startSocketConnection()
})
