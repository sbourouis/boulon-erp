
import {Command, Stock} from '@app-models';
import {Material} from "../models/material";
import {Machine} from "../models/machine";

export class UtilsService {
  constructor() {}

  // return boolean that tell us if the commands can be ordered
  IsOrderPossible(commands: Command[], curDate: Date, stocks: Stock[]): boolean {
    let numberOfHours: number;
    console.log(stocks);
    let previsionalCommands: Command[] = [];
    let tmpStocks = stocks;
    let lastDuration: number;
    let max: number, quantityUsed: number;
    let neededMachines = this.getNeededMachines(commands);
    let inStock: number;
    let newStock: Stock[];
    for (const command of commands) {
      for (const line of command.commandLines) {
        lastDuration = 0;
        for (const task of line.article.manufacturingTasks) {

          /*
           * stock management
           */
          quantityUsed = 0;
          for (let material of task.materials) {
            quantityUsed = (line.quantity / task.quantity) * material.quantityUsed;
            inStock = 0;
            for ( let stock of tmpStocks) {
              if (stock.article.id === line.article.id) {
                inStock += stock.quantity;
              }
            }
            if (inStock < quantityUsed) {
              return false;
            }
          }
          /*
           * end stock management
           */

          neededMachines[task.machine.id] = (line.quantity / task.quantity) * task.duration + lastDuration;
          lastDuration += task.duration;
        }
      }

      numberOfHours = (this.businessDaysBetweenDates(curDate, command.dateLivraison ) - command.supplier.deliveryTime) * 7  ;

      if (neededMachines.length > 1) {
        max = +Object.keys(neededMachines).reduce(function (a, b) {

          return neededMachines[a] > neededMachines[b] ? neededMachines[a] : neededMachines[b];
        });
      } else if (neededMachines.length === 1) {
        max = +Object.values(neededMachines)[0];
      }
      if (numberOfHours < max) {
        return false;
      }
    }
    return true;
  }
  getStockNeeded(commands: Command[], curDate: Date, curStock: Stock[]): Stock[] {
    let res: Stock[] = curStock;
    let quantity: number;
    for (const command of commands) {
      for (const line of command.commandLines) {
        for (const task of line.article.manufacturingTasks) {
          for (const material of task.materials) {

          }
        }
      }
    }
    return res;
  }

  getPrevisionalCommands(commands: Command[]): Command {
    let previsionalCommands: Command[] = [];
    for (const command of commands) {
      for (const line of command.commandLines) {
        // for (const line)
      }
    }
    return previsionalCommands;
  }

  // get an array of the machine which are needed to answer the orders
  getNeededMachines(commands: Command[]): any {
    let res: [{
      machine: Machine,
      dateEnd: Date,
      duration: number
    }] = [];

    let tmpArray: [{
      machine: Machine,
      dateEnd: Date,
      duration: number
    }] = [];
    let tmpDate = new Date();
    // loop on the orders to add infos in res
    for (const command of commands) {
      for (const line of command.commandLines) {
        for (const task of line.article.manufacturingTasks) {
          tmpArray = res.filter( o => o.machine.id === task.machine.id );
          if (tmpArray.length === 0) {

            res.push(
            {
              machine: task.machine,
              dateEnd: command.dateLivraison,
              duration: 0
            });
          } else {
            tmpDate.setDate(command.dateLivraison.getDate() - command.supplier.deliveryTime);
            if (tmpArray[0].dateEnd < command.dateLivraison) {
              tmpArray[0].dateEnd = tmpDate ;
            }
          }
        }
      }
    }
    return res;
  }

  compareCommands(command1: Command, command2: Command): number {
    if (command1.dateLivraison < command2.dateLivraison) {
      return -1;
    }
    if (command1.dateLivraison > command2.dateLivraison) {
      return 1;
    }
    return 0;
  }

  businessDaysBetweenDates(dateDeb: Date, dateFin: Date ): number {
    let counter = 0;
    let tmpDate = dateDeb;
    while (tmpDate <= dateFin) {
      if (this.isBusinessDay(tmpDate)) {
        counter++;
      }
      tmpDate.setDate(tmpDate.getDate() + 1);
    }
    return counter;
  }

  isBusinessDay(date): boolean {
    let dayOfWeek = date.getDay();
    if(dayOfWeek === 0 || dayOfWeek === 6) {
      // Weekend
      return false;
    }

    let holidays = [
      8,
      ''
      // '12/31+5', // New Year's Day on a saturday celebrated on previous friday
      // '1/2+1',   // New Year's Day on a sunday celebrated on next monday
      // '1-3/1',   // Birthday of Martin Luther King, third Monday in January
      // '2-3/1',   // Washington's Birthday, third Monday in February
      // '5~1/1',   // Memorial Day, last Monday in May
      // '7/3+5',   // Independence Day
      // '7/5+1',   // Independence Day
      // '9-1/1',   // Labor Day, first Monday in September
      // '10-2/1',  // Columbus Day, second Monday in October
      // '11/10+5', // Veterans Day
      // '11/11',   // Veterans Day
      // '11/12+1', // Veterans Day
      // '11-4/4',  // Thanksgiving Day, fourth Thursday in November
      // '12/24+5', // Christmas Day
      // '12/25',   // Christmas Day
      // '12/26+1',  // Christmas Day
    ];

    let dayOfMonth = date.getDate(),
      month = date.getMonth() + 1,
      monthDay = month + '/' + dayOfMonth;

    if(holidays.indexOf(month) > -1) {
        return false;
    }

    if (holidays.indexOf(monthDay) > -1) {
      return false;
    }

    let monthDayDay = monthDay + '+' + dayOfWeek;
    if (holidays.indexOf(monthDayDay) > -1) {
      return false;
    }

    let weekOfMonth = Math.floor((dayOfMonth - 1) / 7) + 1,
      monthWeekDay = month + '-' + weekOfMonth + '/' + dayOfWeek;
    if (holidays.indexOf(monthWeekDay) > -1 ) {
      return false;
    }

    let lastDayOfMonth = new Date(date);
    lastDayOfMonth.setMonth(lastDayOfMonth.getMonth() + 1);
    lastDayOfMonth.setDate(0);
    let negWeekOfMonth = Math.floor((lastDayOfMonth.getDate() - dayOfMonth - 1) / 7) + 1,
      monthNegWeekDay = month + '~' + negWeekOfMonth + '/' + dayOfWeek;
    if (holidays.indexOf(monthNegWeekDay) > -1) {
      return false;
    }

    return true;
  }

  SimulateOrder(): number {
    return 0;
  }

  createSequence(commands: Command[], curDate: Date): any {
    let numberOfHours: number;
    let lastDuration: number;
    let max: number, quantityUsed: number;
    let neededMachines = this.getNeededMachines(commands);
    for (const command of commands) {
      for (const line of command.commandLines) {
        lastDuration = 0;
        for (const task of line.article.manufacturingTasks) {
          neededMachines[task.machine.id] = (line.quantity / task.quantity) * task.duration + lastDuration;
          lastDuration += task.duration;
        }
      }

      numberOfHours = (this.businessDaysBetweenDates(curDate, command.dateLivraison ) - command.supplier.deliveryTime) * 7  ;

      if (neededMachines.length > 1) {
        max = +Object.keys(neededMachines).reduce(function (a, b) {

          return neededMachines[a] > neededMachines[b] ? neededMachines[a] : neededMachines[b];
        });
      } else if (neededMachines.length === 1) {
        max = +Object.values(neededMachines)[0];
      }
      if (numberOfHours < max) {
        return false;
      }
    }
    return true;
  }

}
