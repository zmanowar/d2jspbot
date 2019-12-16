import * as WebSocket from "ws";
import { IMessage, MessageTypes, IGoldMessage } from "./interfaces/message";

/**
 * Parses gold data from a message.
 * @param message Message for parsing gold data.
 */
export function parseGoldMessage(message: IMessage): IGoldMessage {
  try {
    return {
      parent: message,
      amount: parseInt(message.data.split(" ")[4], 10),
      message: message.data.match(/:(.*)/g)[0]
    } as IGoldMessage;
  } catch (error) {
    return {
      parent: message,
      amount: -1,
      message: "Invalid gold message",
      error: error
    } as IGoldMessage;
  }
}

/**
 * Parses a message from the data.
 * @param data Websocket data.
 */
export function parseMessage(data: WebSocket.Data): IMessage {
  let params = data.toString().split(" ");
  return {
    type: parseInt(params[1], 10) as MessageTypes,
    serv: params[0].startsWith(":") ? params[0].substr(1) : params[0],
    data: params.slice(2).join(" "),
    params
  } as IMessage;
}
