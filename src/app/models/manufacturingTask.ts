import {Machine} from "./machine";

export interface ManufacturingTask {
  id?: number;
  machine: Machine;
  duration: number;
}
