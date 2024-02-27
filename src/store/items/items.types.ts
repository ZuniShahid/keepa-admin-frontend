export interface Item {
  amount: number;
  barcode: string;
  categoryIdx: number;
  id: string;
  imgId: string;
  name: string;
  prizeBuy: number;
  prizeSell: number;
  timestamp: number;
}

export interface GetItemsResponse {
  items: Item[];
}

export interface PutItemBody {
  amount: number;
  categoryIdx: number;
  name: string;
  prizeBuy: number;
  prizeSell: number;
}

export interface PutItemVariables {
  body: PutItemBody;
  itemId: string;
}
