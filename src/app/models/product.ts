import {Material} from "./material";
import {ManufacturingTask} from "./manufacturingTask";
export interface Product {
  id?: number;
  name: string;
  article: any;
  quantity: number;
  price: number;
  materials: Material[];
  manufacturingTasks: ManufacturingTask[];
}
