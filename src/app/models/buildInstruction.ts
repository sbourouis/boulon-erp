import {Product} from './product';

export interface BuildInstruction {
  id?: number;
  article: Product;
  quantity: number;
  date: string;
}
