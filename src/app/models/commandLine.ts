import {Product} from "./product";
export interface CommandLine {
  id?: number;
  article: Product;
  quantity: number;
  price?: number; // if the the price of the article has changed since the order has been ordered
}
