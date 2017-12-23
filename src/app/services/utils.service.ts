
import {Command, Stock} from '@app-models';
import {Material} from '../models/material';
import {isNullOrUndefined} from 'util';
import {ManufacturingTask} from '../models/manufacturingTask';
import {Product} from '../models/product';
import {Article} from '../models/article';
import {Supplier} from '../models/supplier';


export class UtilsService {
  workHours: number;
  dayWorked: number;

  constructor() {
    this.workHours = 7; // workHours;
    this.dayWorked = 5; // dayWorked;
  }

  // // return boolean that tell us if the commands can be ordered
  // IsOrderPossible(commands: Command[], curDate: Date, stocks: Stock[]): boolean {
  //   let numberOfHours: number;
  //   console.log(stocks);
  //   let previsionalCommands: Command[] = [];
  //   let tmpStocks = stocks;
  //   let lastDuration: number;
  //   let max: number, quantityUsed: number;
  //   let neededMachines = this.getNeededMachines(commands);
  //   let inStock: number;
  //   let newStock: Stock[];
  //   for (const command of commands) {
  //     for (const line of command.commandLines) {
  //       lastDuration = 0;
  //       for (const task of line.article.manufacturingTasks) {
  //
  //         /*
  //          * stock management
  //          */
  //         quantityUsed = 0;
  //         for (let material of task.materials) {
  //           quantityUsed = (line.quantity / task.quantity) * material.quantityUsed;
  //           inStock = 0;
  //           for (let stock of tmpStocks) {
  //             if (stock.article.id === line.article.id) {
  //               inStock += stock.quantity;
  //             }
  //           }
  //           if (inStock < quantityUsed) {
  //             return false;
  //           }
  //         }
  //         /*
  //          * end stock management
  //          */
  //
  //         neededMachines[task.machine.id] = (line.quantity / task.quantity) * task.duration + lastDuration;
  //         lastDuration += task.duration;
  //       }
  //     }
  //
  //     numberOfHours = (this.businessDaysBetweenDates(curDate, command.dateLivraison) - command.supplier.deliveryTime) * 7;
  //
  //     if (neededMachines.length > 1) {
  //       max = +Object.keys(neededMachines).reduce(function (a, b) {
  //
  //         return neededMachines[a] > neededMachines[b] ? neededMachines[a] : neededMachines[b];
  //       });
  //     } else if (neededMachines.length === 1) {
  //       max = +Object.values(neededMachines)[0];
  //     }
  //     if (numberOfHours < max) {
  //       return false;
  //     }
  //   }
  //   return true;
  // }
  //
  // getStockNeeded(commands: Command[], curDate: Date, curStock: Stock[]): Stock[] {
  //   let res: Stock[] = curStock;
  //   let quantity: number;
  //   for (const command of commands) {
  //     for (const line of command.commandLines) {
  //       for (const task of line.article.manufacturingTasks) {
  //         for (const material of task.materials) {
  //
  //         }
  //       }
  //     }
  //   }
  //   return res;
  // }
  //
  // // getPrevisionalCommands(commands: Command[]): Command {
  // //   let previsionalCommands: Command[] = [];
  // //   for (const command of commands) {
  // //     for (const line of command.commandLines) {
  // //       // for (const line)
  // //     }
  // //   }
  // //   return previsionalCommands;
  // // }
  //
  // // get an array of the machine which are needed to answer the orders
  // getNeededMachines(commands: Command[]): any {
  //   let res: Array<{
  //     machine: Machine,
  //     dateEnd: Date,
  //     duration: number
  //   }> = [];
  //
  //   let tmpArray: Array<{
  //     machine: Machine,
  //     dateEnd: Date,
  //     duration: number
  //   }>;
  //   let tmpDate = new Date();
  //   // loop on the orders to add infos in res
  //   for (const command of commands) {
  //     console.log('command');
  //     for (const line of command.commandLines) {
  //       console.log('commandLine');
  //       for (const task of line.article.manufacturingTasks) {
  //         console.log('task');
  //         tmpArray = res.filter(o => o.machine.id === task.machine.id);
  //         console.log(tmpArray.length);
  //         tmpDate.setDate(command.dateLivraison.getDate() - command.supplier.deliveryTime);
  //         if (tmpArray.length === 0) {
  //
  //           res.push(
  //             {
  //               machine: task.machine,
  //               dateEnd: command.dateLivraison,
  //               duration: task.duration
  //             });
  //           console.log(command.dateLivraison);
  //         } else {
  //           if (tmpArray[0].dateEnd < tmpDate) {
  //             tmpArray[0].dateEnd = tmpDate;
  //             tmpArray[0].duration += task.duration;
  //           }
  //         }
  //       }
  //     }
  //   }
  //   return res;
  // }

  /*
    to know which command had to be done first
   */
  compareCommands(command1: Command, command2: Command): number {
    if (command1.dateLivraison < command2.dateLivraison) {
      return -1;
    } else if (command1.dateLivraison > command2.dateLivraison) {
      return 1;
    } else if (command1.date < command2.date) {
        return -1;
    } else if (command1.date > command2.date) {
        return 1;
    }
    return 0;
  }

  businessDaysBetweenDates(dateDeb: Date, dateFin: Date): number {
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

  /*
    return true if it is a business day
   */
  isBusinessDay(date): boolean {
    let dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
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

    if (holidays.indexOf(month) > -1) {
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
    if (holidays.indexOf(monthWeekDay) > -1) {
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

  // createSequence(commands: Command[], curDate: Date): any {
  //   let numberOfHours: number;
  //   let lastDuration: number;
  //   let max: number, quantityUsed: number;
  //   let neededMachines = this.getNeededMachines(commands);
  //   for (const command of commands) {
  //     for (const line of command.commandLines) {
  //       lastDuration = 0;
  //       for (const task of line.article.manufacturingTasks) {
  //         neededMachines[task.machine.id] = (line.quantity / task.quantity) * task.duration + lastDuration;
  //         lastDuration += task.duration;
  //       }
  //     }
  //
  //     numberOfHours = (this.businessDaysBetweenDates(curDate, command.dateLivraison) - command.supplier.deliveryTime) * 7;
  //
  //     if (neededMachines.length > 1) {
  //       max = +Object.keys(neededMachines).reduce(function (a, b) {
  //
  //         return neededMachines[a] > neededMachines[b] ? neededMachines[a] : neededMachines[b];
  //       });
  //     } else if (neededMachines.length === 1) {
  //       max = +Object.values(neededMachines)[0];
  //     }
  //     if (numberOfHours < max) {
  //       return false;
  //     }
  //   }
  //   return true;
  // }
  //
  // getOrdersDate(commands: Command[]): Date[] {
  //   // param
  //   let workHours = 7;  // number of hours in a day
  //   let workDay = 5;  // number of day in a week
  //   // return
  //   let dates: Date[] = []; // dates on which orders had to be launched
  //   // usedVariable
  //   let machines: Array<{
  //     machine: Machine,
  //     dateEnd: Date,
  //     days: Array<Array<number>>
  //   }> = [];  // array which contains the machine's activity
  //   let dayArray$: Array<Array<number>> = []; // contains an array for each day used
  //   let lastNumberOfDays = 0; // used to know when next task has to be started
  //   let found = false;  // used to know if machine has been found
  //   let reverseTasks: ManufacturingTask[] = []; // used to reverse the task to start on the delivery date
  //   // TODO : sort commands
  //   // loop on the orders to get all infos needed
  //   for (const command of commands) {
  //     for (const line of command.commandLines) {
  //       /*
  //         reverse tasks
  //        */
  //       reverseTasks = line.article.manufacturingTasks;
  //       reverseTasks.reverse();
  //       // reset beginning of the next task
  //       lastNumberOfDays = 0;
  //       for (const task of reverseTasks) {
  //         // console.log('task');
  //         // console.log(task);
  //         found = false;
  //         dayArray$ = this.getNeededDays(line.quantity, task.quantity, task.duration, workHours);
  //         /*
  //           loop on the machines
  //           */
  //         let self = this;
  //         machines.forEach(function (elem) {
  //           // check if current task use the current machine
  //           if (!isNullOrUndefined(elem) && elem.machine.id === task.machine.id) {
  //             found = true;
  //             // console.log('%c Last number of days ' + lastNumberOfDays, 'color : green');
  //             // console.log(machines[machines.length - 1].days);
  //             /*
  //               add empty days
  //               */
  //             // for (let i = elem.days.length; i < lastNumberOfDays; i++) {
  //             //   elem.days.unshift([]);
  //             // }
  //             // console.log(machines[machines.length - 1].days);
  //             // elem.days = dayArray$.concat(elem.days);
  //             // console.log(dayArray$);
  //             // console.log('machines days loop machines');
  //             // console.log(elem.days);
  //             lastNumberOfDays = self.addDays(elem, dayArray$, workHours, lastNumberOfDays); // elem.days.length;
  //             // console.log(elem.days);
  //
  //           }
  //         });
  //         /*
  //           if machine isn't found, add it
  //          */
  //         if (!found) {
  //           // console.log('not found');
  //           machines.push({
  //             machine: task.machine,
  //             dateEnd: new Date(),
  //             days: []
  //           });
  //           // console.log('%c Last number of days NOT FOUND' + lastNumberOfDays, 'color : green');
  //           // console.log(machines[machines.length - 1].days);
  //           for (let i = 0; i < lastNumberOfDays; i++) {
  //             machines[machines.length - 1].days.unshift([]);
  //           }
  //           // console.log(machines[machines.length - 1].days);
  //           machines[machines.length - 1].days = dayArray$.concat(machines[machines.length - 1].days);
  //           lastNumberOfDays = machines[machines.length - 1].days.length;
  //           // console.log('machines days');
  //           // console.log(machines[machines.length - 1].days);
  //         }
  //       }
  //     }
  //   }
  //   console.log('machines');
  //   console.log(machines);
  //   return dates;
  // }
  // getNeededDays(quantityLine: number, quantityTask: number, durationTask: number, workHours: number ):
  //   Array<Array<number>> {
  //   let dayArray$: Array<Array<number>> = [];
  //   let hourArray$: Array<number> = [];
  //   // add all full days that are worked
  //   for (let days = 1; days <= ((durationTask * (quantityLine / quantityTask)) / workHours); days++) {
  //     hourArray$ = [];
  //     for (let hours = 0; hours < workHours; hours++) {
  //       hourArray$.push(hours);
  //     }
  //     dayArray$.unshift(hourArray$);
  //   }
  //   // add the hours which are don't fill the day
  //   if (((durationTask * (quantityLine / quantityTask)) % workHours) > 0) {
  //     hourArray$ = [];
  //     for (let hours = 0; hours <= ((durationTask * (quantityLine / quantityTask)) % workHours); hours++) {
  //       hourArray$.push(hours);
  //     }
  //     dayArray$.unshift(hourArray$);
  //   }
  //   return dayArray$;
  // }
  // addDays(machine: {
  //   machine: Machine,
  //   dateEnd: Date,
  //   days: Array<Array<number>>
  // }, dayArray$: Array<Array<number>>, workHour: number, lastDayIndex: number): number {
  //   let index = lastDayIndex;
  //   console.log('%c index ' + index, 'color : orange');
  //   console.log(dayArray$);
  //   // check if there are more days than the start of the next task
  //   if (machine.days.length >= index) {
  //     // start from the beginning of the next task and go to the past
  //     for (; index < machine.days.length; index++) {
  //       console.log('%c machine loop : ' + index + 'day Array ' + dayArray$.length, 'color : orange');
  //       // if dayArray is empty return the index
  //       if ( dayArray$.length > 0) {
  //         for ( ; machine.days[index].length < workHour && dayArray$.length > 0; ) {
  //           machine.days[index].push(machine.days[index].length - 1 >= 0 ? machine.days[index].length - 1 : 0);
  //           dayArray$[0].pop();
  //         }
  //       } else {
  //         console.log('%c else', 'color : red')
  //         return index - 1 ;
  //       }
  //     }
  //   } else {
  //     console.log('%c else' + machine.days.length + 'test' + lastDayIndex, 'color : orange');
  //     for (let i = machine.days.length; i < lastDayIndex; i++) {
  //       machine.days.unshift([]);
  //     }
  //   }
  //   console.log('dayArray$');
  //   console.log(dayArray$);
  //   console.log(machine.days);
  //   machine.days = dayArray$.concat(machine.days);
  //   console.log(machine.days);
  //   index = machine.days.length;
  //   console.log('%c machine end ' + index, 'color : orange');
  //   return index;
  // }
  // isOrderPossible(commands: Command[], date: Date): boolean {
  //   let res = false;
  //   let dates: Date[] = this.getOrdersDate(commands);
  //   res = dates.length > 0 && dates.every( o => o > date );
  //   return res;
  // }

  /*
    merge TaskArray to know which task has to be done before another
   */
  mergeTaskArray(tab1: Array<{task: ManufacturingTask, launchDate: Date, date: Date }>,
                 tab2: Array<{task: ManufacturingTask, launchDate: Date, date: Date }>):
          Array<{task: ManufacturingTask, launchDate: Date, date: Date }> {
    let res:  Array<{task: ManufacturingTask, launchDate: Date, date: Date }> = [];
    let count2: number = 0;
    for (let count1 = 0; count1 < tab1.length; count1++) {
      for (count2 = 0; count2 < tab2.length; count2++) {
        if (tab1[count1].date > tab2[count2].date ) {
          count2 = tab2.length;
        } else {
          res.push(tab2[count2]);
        }
      }
      res.push(tab1[count1]);
    }
    while ( count2 < tab2.length) {
      res.push(tab2[count2]);
      count2++;
    }
    console.log('res');
    console.log(res);
    return res;
  }

  /*
  get an array of each tasks that are needed to make the orders
 */
  getTasksFromCommands(commands: Command[]): Array<{task: ManufacturingTask, launchDate: Date, date: Date }> {
    let res$: Array<{task: ManufacturingTask, launchDate: Date, date: Date }> = [];
    //  sort orders
    commands.sort(this.compareCommands);
    console.log(commands);
    for (const command of commands) {
      res$ = this.mergeTaskArray(res$, this.getTasksFromCommand(command)); // res$.concat(this.getTasksFromCommand(command));
    }
    return res$;
  }

  /*
  get an array of each tasks that are needed to make the order
 */
  getTasksFromCommand(command: Command): Array<{task: ManufacturingTask, launchDate: Date, date: Date }> {
    console.log(command);
    let res$: Array<{task: ManufacturingTask, launchDate: Date, date: Date }> = [];
    let tmpDate = new Date();

      tmpDate.setDate(command.dateLivraison.getDate() - command.supplier.deliveryTime);
      res$ = this.mergeTaskArray(res$, this.getTasksFromProduct(command.product, command.quantity, tmpDate, command.date));
    return res$;
  }

  /*
    get an array of each tasks that are needed to create the product
   */
  getTasksFromProduct(product: Product, quantity: number, date: Date, launchDate: Date):
                          Array<{task: ManufacturingTask, launchDate: Date, date: Date }> {
    let res$: Array<{task: ManufacturingTask, launchDate: Date, date: Date }> = [];
    let tmpDateTask = date;
    let tmpDate = date;
    let neededDays = 0;
    let tmpTasks = product.manufacturingTasks;
    let ratio = 0;
    tmpTasks.reverse();
    /*
      loop on the manufacturingTasks
     */
    for (let task of tmpTasks) {
      // repeat each task to get the right quantity
      // for ( let c = 0; c < quantity / task.quantity; c++) {
      ratio = quantity / task.quantity;
      task.quantity *= ratio;
      task.duration *= ratio;

      res$.push({task: task, date: tmpDateTask, launchDate});

      // duration of the current task
      tmpDate = new Date();
      neededDays = Math.trunc(task.duration / this.workHours);
      tmpDate = this.substractDays(tmpDateTask, neededDays);
      neededDays = Math.ceil(task.duration % this.workHours);
      // to change day if not enough hours available in that day
      tmpDate.setHours(tmpDateTask.getHours() - (neededDays * 24 / this.workHours));
      tmpDateTask = tmpDate;
      console.log('tmp : ' + tmpDateTask);
      /*
          loop on the materials to add tasks to produce this material
      */
      task.materials.reverse();
      for (const material of task.materials) {
        material.quantityUsed *= ratio;

        if ('manufacturingTasks' in  material.material ) {
           console.log('TODO find date' +  material.quantityUsed);
          res$ = this.mergeTaskArray(res$, this.getTasksFromProduct(<Product> material.material, material.quantityUsed,
              tmpDateTask, launchDate));
          /*
            get the time needed to do all tasks
          */
          tmpDate = new Date();

          neededDays = Math.trunc(res$[res$.length - 1].task.duration / this.workHours);
          tmpDate = this.substractDays(res$[res$.length - 1].date, neededDays);
          neededDays = Math.ceil(res$[res$.length - 1].task.duration % this.workHours);
          // to change day if not enough hours available in that day
          tmpDate.setHours(res$[res$.length - 1].date.getHours() - (neededDays * 24 / this.workHours ));
          tmpDateTask = tmpDate;
        }
      }
      task.materials.reverse();
      // }
    }
    return res$;
  }

  /*
    substract business days from date
   */
  substractDays(date: Date, days: number): Date {
    let res = new Date();
    res.setDate(date.getDate());
    for (let i = 0; i <= days; i++) {
      res.setDate(res.getDate() - i);
      if (!this.isBusinessDay(res)) {
        i--;
        res.setDate(res.getDate() - 1);
      }
    }
    return res;
  }

  checkIfOrderPossibleWithoutStocks(tasks$: Array<{task: ManufacturingTask, launchDate: Date, date: Date }>): boolean {
    let date: Date;
    for (const task of tasks$) {
      console.log('%c date Task : ' + task.date, 'color : blue');
      date = this.substractDays(task.date, Math.trunc(task.task.duration / this.workHours) );
      console.log('%c date : ' + date, 'color : blue');
      if (date < task.launchDate) {
        console.log('%c date Launch : ' + task.launchDate, 'color : blue');
        return false;
      }
    }
    return true;
  }

  getOrdersDates(commands$: Command[], stocks$: Array<Stock>, suppliers$: Array<Supplier>):
  Array<{material: Material, supplier: Supplier, date: Date}> {
    return this.getOrderDatesTask(this.getTasksFromCommands(commands$), stocks$, suppliers$);
  }

  getOrderDatesTask(tasks$: Array<{task: ManufacturingTask, launchDate: Date, date: Date }>, stocks$: Array<Stock>,
                suppliers$: Array<Supplier>): Array<{material: Material, supplier: Supplier, date: Date}> {
    let dates$: Array<{material: Material, supplier: Supplier, date: Date}> = [];
    let supplier: Supplier;
    let date: Date;
    let tmpTasks$ = tasks$.slice();
    let currentTask: {task: ManufacturingTask, launchDate: Date, date: Date };
    let tmpStock: number;
    if (!this.checkIfOrderPossibleWithoutStocks(tasks$)) {
      console.log('order is not possible, time is too short');
      return dates$;
    }
    console.log('tasks ');
    console.log(tasks$);
    while (tmpTasks$.length > 0 ) {
      currentTask = tmpTasks$.pop();
      console.log(' current task ');
      console.log(currentTask);
      date = this.substractDays(currentTask.date, Math.trunc(currentTask.task.duration / this.workHours) );
      for (const material of currentTask.task.materials) {
        console.log(' Material ');
        console.log(material.material.id);

        console.log(' Stock ');
        console.log(stocks$);
        tmpStock = this.getStockFromArticle(stocks$, material.material, date);
        console.log('%c stock' + tmpStock, 'color : red');
        if (tmpStock < material.quantityUsed) {
          console.log('Should Command');
          if (material.material instanceof Material) {

            // if we haven't enough stock, order
            supplier = this.getSupplier(suppliers$, <Material> material.material);
            dates$.push({ date: this.substractDays(date, supplier.deliveryTime),
                          supplier: supplier,
                          material: material.material});
            console.log('Commande ' + date);
            stocks$.push({
              article: material.material,
              quantity: (<Material> material.material).maxStock - tmpStock,
              date: date
            });
          } else {
            console.log('Stock de produits fabriqués insuffisant');
            console.log(tmpStock);
            return [];
          }
        }
        stocks$.push({ article: material.material,
          quantity: -material.quantityUsed,
          date: date });
      }
    }
    console.log(dates$);
    return dates$;
  }

  getStockFromArticle(stocks$: Array<Stock>, material: Article, date: Date): number {
    let stock = 0;
    const stockFilterd$ = stocks$.filter(o => o.article.id === material.id && o.date <= date);
    console.log('%c Stock filtere ' + date, 'color:green');
    console.log(stockFilterd$);
    stockFilterd$.forEach(function (elem) {
      stock += elem.quantity;
    });
    return stock;
  }

  getSupplier(suppliers$: Array<Supplier>, material: Material): Supplier {
    let res: Supplier;
    for ( const supplier of suppliers$) {
      for (const mat of supplier.materials) {
        if (mat.material.id === material.id) {
          res = isNullOrUndefined(res) ? supplier : res.deliveryTime < supplier.deliveryTime ? res : supplier;
        }
      }
    }
    return res;
  }

  areOrdersPossible(commands$: Command[], stocks$: Array<Stock>, suppliers$: Array<Supplier>): boolean {
    return this.getOrdersDates(commands$, stocks$, suppliers$).length > 0;
  }
  //
  getCost(commands$: Command[], stocks$: Array<Stock>, suppliers$: Array<Supplier>, hourCost: number): number {
    let res = 0;
    let numberOfMonth = 0;
    let tasks$: Array<{task: ManufacturingTask, launchDate: Date, date: Date }> = this.getTasksFromCommands(commands$);
    let materials: Array<{
      material: Material,
      price: number,
      growth: number,
      date: Date
    }>;
    for (let task of tasks$) {
      res += hourCost * task.task.duration;
    }
    for (let order of this.getOrdersDates(commands$, stocks$, suppliers$)) {
      materials = order.supplier.materials.filter( o => o.material.id === order.material.id);
      if (materials.length > 0){
        numberOfMonth = this.getMonthBetween(materials[0].date, order.date);
        res += materials[0].price * Math.pow((1 + materials[0].growth), (numberOfMonth < 0 ? 1 / numberOfMonth : numberOfMonth));
      }
    }
    return res;
  }

  getPrice(commands$: Command[], stocks$: Array<Stock>, suppliers$: Array<Supplier>, hourCost: number, margin: number): number {
    return this.getCost(commands$, stocks$, suppliers$, hourCost) * (1 + margin);
  }

  getMonthBetween(date1: Date, date2: Date): number {
    let res = 0;
    res += (date2.getFullYear() - date1.getFullYear()) * 12;
    res += date2.getMonth() - date1.getMonth();
    return res;
  }
}
