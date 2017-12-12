import {CommandLine} from "./commandLine";
import {Supplier} from "./supplier";

export interface Command {
  id?: number;
  date: any;
  dateLivraison: any;
  supplier: Supplier;
  commandLines: CommandLine[];
  discount: number;
}
