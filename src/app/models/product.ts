import {Material} from "./material";
import {ManufacturingTask} from "./manufacturingTask";
import {Article} from "./article";
export interface Product extends Article {
  manufacturingTasks: ManufacturingTask[];
}
