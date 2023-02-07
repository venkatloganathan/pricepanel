const MESSAGE_INTERVAL = 1_000;

const WebSocket = require("ws");

const websocketServer = new WebSocket.Server({ port: 8000 });

const socketCollection = new Set();

let isSubscribed = false;

const currencyPairs = [
  {
    id: "0",
    lastPrice: 1000.20197,
    maxPrice: 3000.40197,
    minPrice: 1000.19799,
    maxSpread: 0.8,
    minSpread: 0.3,
  },
  {
    id: "1",
    lastPrice: 109.34,
    maxPrice: 122.923,
    minPrice: 104.973,
    maxSpread: 0.8,
    minSpread: 0.3,
  },
  {
    id: "2",
    lastPrice: 1.3819,
    maxPrice: 4.40064,
    minPrice: 1.366951,
    maxSpread: 1.2,
    minSpread: 0.3,
  },
  {
    id: "3",
    lastPrice: 0.913208,
    maxPrice: 4.22348,
    minPrice: 0.90794,
    maxSpread: 0.7,
    minSpread: 0.1,
  },
  {
    id: "4",
    lastPrice: 1.228855,
    maxPrice: 5.264599,
    minPrice: 1.21423,
    maxSpread: 1.0,
    minSpread: 0.8,
  },
];

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getRandom(max) {
  return Math.random() * max;
}

function getPriceData() {
  const data = [];
  for (let i = 0; i < currencyPairs.length; i++) {
    const pair = currencyPairs[i];
    let currentPrice = pair.lastPrice;
    const direction = getRandomInt(2);
    const difference = getRandom(1);
    if (direction === 0) {
      currentPrice -= difference;
    } else {
      currentPrice += difference;
    }
    currentPrice = Math.min(currentPrice, pair.maxPrice);
    currentPrice = Math.max(currentPrice, pair.minPrice);
    currentPrice = Math.round(currentPrice * 1000) / 1000;
    pair.lastPrice = currentPrice;

    const spread = Math.round(getRandom(pair.maxSpread) * 10) / 10;
    data.push({
      id: pair.id,
      p: currentPrice,
      s: spread,
      d: new Date()
    });
  }
  return data;
}

let priceIntervalTimer = null;

if (!priceIntervalTimer) {
  priceIntervalTimer = setInterval(() => {
    if (isSubscribed) {
      socketCollection.forEach((client) => {
        client.send(JSON.stringify(getPriceData()));
      });
    }
  }, MESSAGE_INTERVAL);
}

websocketServer.on("connection", (ws) => {
  socketCollection.add(ws);
  ws.on("message", (data) => {
    const message = data.toString();
    isSubscribed = message?.trim()?.toLowerCase() === "subscribe";
  });

  ws.on("close", () => {
    socketCollection.delete(ws);
  });
});
