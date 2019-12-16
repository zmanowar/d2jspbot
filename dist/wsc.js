"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WebSocket = require("ws");
var message_1 = require("./message");
var interfaces_1 = require("./interfaces");
var logger = require("./logger");
var config = require("../working.config.json");
var client = new WebSocket(config.server);
/**
 * On connect.
 */
client.on("open", function () {
    console.log("Connected...");
    client.send("NICK #" + config.user.id);
    client.send("USER U" +
        config.user.id +
        " njIRCIM " +
        config.server +
        " :njIRCIM User ID " +
        config.user.id);
    client.send("FAUTH " + config.user.h);
});
/**
 * On client message.
 * This currently does not handle chunking (if needed).
 */
client.onmessage = function (data) {
    if (data.type == "message") {
        var message = message_1.parseMessage(data.data);
        if (message.type === interfaces_1.MessageTypes.AUTHORIZED) {
            // User is properly authorized.
            logger.log("Authorized as " + message.params[2]);
        }
        if (message.type === interfaces_1.MessageTypes.GOLD) {
            // FG was recieved.
            var gold = message_1.parseGoldMessage(message);
            if (gold.error) {
                logger.error(gold.parent);
                logger.error(gold.error);
            }
            else {
                var item = { price: 1, title: "test" };
                if (gold.amount > item.price) {
                    console.log("Item purchased");
                }
            }
        }
    }
    else {
        // Unknown message type.
        logger.log(data.type + ":" + data.data);
    }
};
