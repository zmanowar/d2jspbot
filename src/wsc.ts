import * as WebSocket from "ws";
import { parseMessage, parseGoldMessage } from "./message";
import { MessageTypes } from "./interfaces";
import * as logger from "./logger";

const config = require("../working.config.json");
const client = new WebSocket(config.server);

/**
 * On connect.
 */
client.on("open", () => {
  logger.log("Connected...");
  client.send("NICK #" + config.user.id);
  client.send(
    "USER U" +
      config.user.id +
      " njIRCIM " +
      config.server +
      " :njIRCIM User ID " +
      config.user.id
  );
  client.send("FAUTH " + config.user.h);
});

/**
 * On client message.
 * This currently does not handle chunking (if needed).
 */
client.onmessage = data => {
  if (data.type == "message") {
    const message = parseMessage(data.data);
    if (message.type === MessageTypes.AUTHORIZED) {
      // User is properly authorized.
      logger.log("Authorized as " + message.params[2]);
    }
    if (message.type === MessageTypes.GOLD) {
      // FG was received.
      const gold = parseGoldMessage(message);
      if (gold.error) {
        logger.error(gold.parent);
        logger.error(gold.error);
      } else {
        let item = { price: 1, title: "test" };
        if (gold.amount > item.price) {
          logger.log("Item purchased");
        }
      }
    }
  } else {
    // Unknown message type.
    logger.log(data.type + ":" + data.data);
  }
};
