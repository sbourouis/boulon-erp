import {Article} from "./article";

export interface ManufacturingTask {
  id?: number;
  name: string;
  machineId: number;
  duration: number;
  quantity: number;
  materials: Array<{
    material: Article;
    quantityUsed: number;
  }>;
}
