import {Material} from "./material";
export interface Product {
  id?: number;
  article: any;
  quantity: number;
  price: number;
  materials: Material[];
}
