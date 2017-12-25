import {Machine} from "./machine";
import {Material} from "./material";
import {Product} from "./product";
import {Article} from "./article";

export interface ManufacturingTask {
  id?: number;
  name: string;
  machineId: number;
  duration: number;
  quantity: number; // quantité produite
  materials: Array<{
    material: Article;
    quantityUsed: number;
  }>;
}
