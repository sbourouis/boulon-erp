import {Article} from "./article";

export interface Stock {
  id?: number;
  article: Article;
  quantity: number;
  date: Date;
}
