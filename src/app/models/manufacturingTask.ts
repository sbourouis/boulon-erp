import {Machine} from "./machine";
import {Material} from "./material";

export interface ManufacturingTask {
  id?: number;
  machine: Machine;
  duration: number;
  quantity: number;
  materials: [{
    material: Material;
    quantityUsed: number;
  }]
}
