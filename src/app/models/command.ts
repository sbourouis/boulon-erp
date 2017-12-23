import {Supplier} from "./supplier";
import {Product} from "./product";

export interface Command {
  id?: number;
  date: any;
  dateLivraison: Date;
  supplier: Supplier;
  product: Product;
  quantity: number;
  discount?: number;
}
