## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the both server and app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
Server is written in Node, websocket server runs on port 8000

Price is unsubscribed by default. Websockets streams data only when subscribed.
Price Icon movement displays only for UP and DOWN, it won't display icon if the direction
is similar to last price direction.

### Known issues

Websocket supports only one client because subscribe/unsubscribe flag will affect other
clients as well

PriceSubscription subscribe/unsubscribe method needs refactor for multiple module 
subscription

CSS needs refactoring

### Todo

Add ID in the header

Get Product list from web socket

Replace date with unix time stamp

Make websocket client to support multiple end points

