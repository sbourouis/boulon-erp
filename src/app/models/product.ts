import {Material} from "./material";
export interface Product {
  id?: number;
  name: string;
  article: any;
  quantity: number;
  price: number;
  materials: Material[];
}
