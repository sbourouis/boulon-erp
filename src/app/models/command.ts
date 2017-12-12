import {CommandLine} from "./commandLine";

export interface Command {
  id?: number;
  date: any;
  commandLines: CommandLine[];
}
