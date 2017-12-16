import {Article} from "./article";
export interface CommandLine {
  id?: number;
  article: Article;
  quantity: number;
  price?: number; // if the the price of the article has changed since the order has been ordered
}
