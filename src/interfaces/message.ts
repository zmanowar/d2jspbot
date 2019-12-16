export enum MessageTypes {
  CHAN_TOPIC = 332,
  CHAN_TOPIC_AUTHOR = 333,
  CHAN_USER_LIST = 353,
  CHAN_USER_SORT = 366,
  SYS = 326,
  INVITE_SENT = 341,
  USER_OFFLINE = 401,
  AUTHORIZED = 650,
  PM = 651,
  GOLD = 652,
  TOPIC = 656
}

export interface IMessage {
  type: MessageTypes;
  serv: string;
  data: string;
  params: string[];
}

export interface IGoldMessage {
  parent: IMessage;
  amount: number;
  message: string;
  error?: Error;
}
