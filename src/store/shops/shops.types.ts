import { Item } from "../items/items.types";

export interface CreateShopVariables {
  body: {
    name: string;
  };
}

export interface Shop {
  id: string;
  name: string;
}

export interface ShopExtended extends Shop {
  items: Item[];
  sales: ShopSale[];
}

export interface ShopSale {
  discountAmount: number;
  payment: string;
  products: ShopSaleProduct[];
  timestamp: number;
  uid: string;
}

export interface ShopSaleProduct {
  amount: number;
  barcode: string;
  categoryIdx: number;
  imgId: string;
  linkedProductId: string | null;
  name: string;
  prizeBuy: number;
  prizeSell: number;
  timestamp: number;
}
