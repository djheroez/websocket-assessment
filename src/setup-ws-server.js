import http from "http";
import WebSocket from "ws";

import { handlerResolver, messageParser } from "./message-handlers";

export default app => {
  const server = http.createServer(app);

  const wss = new WebSocket.Server({ server });

  wss.on("connection", ws => {
    ws.send("Connection started...");

    ws.on("message", message => {
      const messageData = messageParser(message);
      if (typeof messageData === "object") {
        const handler = handlerResolver(messageData.type)
        if (handler) {
          handler(ws, messageData);
        } else {
          console.warn("A handler was not found for this message type");
        }
      } else {
        console.warn("Can not handle this message.");
      }
    });
  });

  server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${server.address().port}`);
  });
}
