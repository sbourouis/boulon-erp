import {Product} from "./product";
export interface CommandLine {
  id?: number;
  article: Product;
  quantity: number;
}
