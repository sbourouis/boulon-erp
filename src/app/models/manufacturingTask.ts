import {Machine} from "./machine";
import {Material} from "./material";

export interface ManufacturingTask {
  id?: number;
  machine: Machine;
  duration: number;
  quantity: number; // quantité produite
  materials: Array<{
    material: Material;
    quantityUsed: number;
  }>;
}
