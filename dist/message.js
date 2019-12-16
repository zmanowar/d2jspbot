"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Parses gold data from a message.
 * @param message Message for parsing gold data.
 */
function parseGoldMessage(message) {
    try {
        return {
            parent: message,
            amount: parseInt(message.data.split(" ")[4], 10),
            message: message.data.match(/:(.*)/g)[0]
        };
    }
    catch (error) {
        return {
            parent: message,
            amount: -1,
            message: "Invalid gold message",
            error: error
        };
    }
}
exports.parseGoldMessage = parseGoldMessage;
/**
 * Parses a message from the data.
 * @param data Websocket data.
 */
function parseMessage(data) {
    var params = data.toString().split(" ");
    return {
        type: parseInt(params[1], 10),
        serv: params[0].startsWith(":") ? params[0].substr(1) : params[0],
        data: params.slice(2).join(" "),
        params: params
    };
}
exports.parseMessage = parseMessage;
