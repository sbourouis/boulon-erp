
import {Command, Stock} from '@app-models';
import {Material} from "../models/material";


export class UtilsService {
  constructor() {}

  IsOrderPossible(commands: Command[], curDate: Date, stocks: Stock[]): boolean {
    let numberOfHours: number;
    console.log(stocks);
    let tmpStocks = stocks;
    let lastDuration: number;
    let max: number, quantityUsed: number;
    let neededMachines = this.getNeededMachines(commands);
    let inStock: number;
    for (const command of commands) {
      for (const line of command.commandLines) {
        lastDuration = 0;
        for (const task of line.article.manufacturingTasks) {

          /*
           * stock management
           */
          quantityUsed = 0;
          for (let i = 0; i < task.materials.length && i < task.quantityUsed.length; i++) {
            quantityUsed = (line.quantity / task.quantity) * task.quantityUsed[i];
            inStock = 0;
            for ( let stock of tmpStocks) {
              if (stock.article.id === line.article.id) {
                inStock += stock.quantity;
              }
            }
            if (inStock >= quantityUsed) {
              // stock.quantity -= quantityUsed;
            } else {
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

  // get an array of the machine which are needed to answer the orders
  getNeededMachines(commands: Command[]): any {
    let res = [];
    for (const command of commands) {
      for (const line of command.commandLines) {
        for (const task of line.article.manufacturingTasks) {
          if (res[task.machine.id] === undefined) {

            res.push(
            {
              key : task.machine.id,
              value: 0
            });
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

}
