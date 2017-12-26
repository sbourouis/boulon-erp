import {Command, Stock} from "@app-models";
import {Material} from "../models/material";
import {ManufacturingTask} from "../models/manufacturingTask";
import {Product} from "../models/product";
import {Article} from "../models/article";
import {Supplier} from "../models/supplier";

export class UtilsService {
  workHours: number;
  dayWorked: number;

  constructor() {
    this.workHours = 7; // workHours;
    this.dayWorked = 5; // dayWorked;
  }

  /*
   to know which command had to be done first
   */
  static compareCommands(command1: Command, command2: Command): number {
    if (new Date(command1.dateLivraison) < new Date(command2.dateLivraison)) {
      return -1;
    } else if (new Date(command1.dateLivraison) > new Date(command2.dateLivraison)) {
      return 1;
    } else if (new Date(command1.date) < new Date(command2.date)) {
      return -1;
    } else if (new Date(command1.date) > new Date(command2.date)) {
      return 1;
    }
    return 0;
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
    let holidays = ['8'];

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
    return holidays.indexOf(monthNegWeekDay) === -1;
  }

  compareTasks(task1: {task: ManufacturingTask, launchDate: Date, date: Date, product: Product},
               task2: {task: ManufacturingTask, launchDate: Date, date: Date, product: Product}) {
    if (new Date(task1.date).getTime() > new Date(task2.date).getTime()) {
      return -1;
    } else if (new Date(task1.date).getTime() < new Date(task2.date).getTime()) {
      return 1;
    } else if (new Date(task1.launchDate).getTime() > new Date(task2.launchDate).getTime()) {
      return -1;
    } else if (new Date(task1.launchDate).getTime() < new Date(task2.launchDate).getTime()) {
      return 1;
    }
    return 0;
  }

  /*
   merge TaskArray to know which task has to be done before another
   */
  mergeTaskArray(tab1: Array<{task: ManufacturingTask, launchDate: Date, date: Date, product: Product, sequence: number }>,
                 tab2: Array<{task: ManufacturingTask, launchDate: Date, date: Date, product: Product, sequence: number }>): Array<{task: ManufacturingTask, launchDate: Date, date: Date, product: Product, sequence: number }> {
    return tab1.slice().concat(tab2).sort(this.compareTasks);
  }

  /*
   get an array of each tasks that are needed to make the orders
   */
  getTasksFromCommands(commands: Command[]): Array<{task: ManufacturingTask, launchDate: Date, date: Date, product: Product, sequence: number }> {
    let res: Array<{task: ManufacturingTask, launchDate: Date, date: Date, product: Product, sequence: number }> = [];
    let sequence = 0;
    //  sort orders
    commands.sort(UtilsService.compareCommands);
    for (const command of commands) {
      res = this.mergeTaskArray(res, this.getTasksFromCommand(command, sequence));
      sequence++;
    }
    return res;
  }

  /*
   get an array of each tasks that are needed to make the order
   */
  getTasksFromCommand(command: Command, sequence: number): Array<{task: ManufacturingTask, launchDate: Date, date: Date, product: Product, sequence: number }> {
    let res: Array<{task: ManufacturingTask, launchDate: Date, date: Date, product: Product, sequence: number }> = [];
    let tmpDate = this.substractDays(new Date(command.dateLivraison), command.supplier.deliveryTime);
    res = this.mergeTaskArray(res, this.getTasksFromProduct(command.product, command.quantity, tmpDate, new Date(command.date), sequence));
    return res;
  }

  /*
   get an array of each tasks that are needed to create the product
   */
  getTasksFromProduct(product: Product, quantity: number, date: Date, launchDate: Date, sequence: number): Array<{task: ManufacturingTask, launchDate: Date, date: Date, product: Product, sequence: number }> {
    let res: Array<{task: ManufacturingTask, launchDate: Date, date: Date, product: Product, sequence: number}> = [];
    let tmpDateTask = date;
    let tmpDate: Date;
    let neededDays: number;
    let tmpTasks = product.manufacturingTasks;
    tmpTasks.reverse();
    /*
     loop on the manufacturingTasks
     */
    for (let task of tmpTasks) {
      // repeat each task to get the right quantity
      for (let c = 0; c < quantity / task.quantity; c++) {
        if (!this.isBusinessDay(tmpDateTask)) {
          tmpDateTask = this.substractDays(tmpDateTask, 1);
        }
        res.push({task: task, date: tmpDateTask, launchDate: launchDate, product: product, sequence: sequence});

        tmpDate = new Date(tmpDateTask.getTime());
        // duration of the current task
        neededDays = Math.ceil(task.duration % this.workHours);
        // to change day if not enough hours available in that day
        tmpDate.setHours(tmpDate.getHours() - (neededDays * 24 / this.workHours));

        neededDays = Math.trunc(task.duration / this.workHours);
        tmpDate = this.substractDays(tmpDate, neededDays);

        tmpDateTask = tmpDate;
        /*
         loop on the materials to add tasks to produce this material
         */
        task.materials.reverse();
        for (const material of task.materials) {
          // material.quantityUsed *= ratio;
          if (material.material['manufacturingTasks']) {
            res = this.mergeTaskArray(res, this.getTasksFromProduct(<Product>material.material, material.quantityUsed,
              tmpDateTask, launchDate, sequence));
            /*
             get the time needed to do all tasks
             */
            neededDays = Math.trunc(res[res.length - 1].task.duration / this.workHours);
            tmpDate = this.substractDays(res[res.length - 1].date, neededDays);
            neededDays = Math.ceil(res[res.length - 1].task.duration % this.workHours);
            // to change day if not enough hours available in that day
            tmpDate.setHours(res[res.length - 1].date.getHours() - (neededDays * 24 / this.workHours));
            tmpDateTask = tmpDate;
          }
        }
        task.materials.reverse();
      }
    }
    return res;
  }

  /*
   substract business days from date
   */
  substractDays(date: Date, days: number): Date {
    let res = new Date(date.getTime());
    for (let i = 0; i < days; i++) {
      if (!this.isBusinessDay(res)) {
        i--;
      }
      res.setDate(res.getDate() - 1);
    }
    return res;
  }

  checkIfOrderPossibleWithoutStocks(tasks: Array<{task: ManufacturingTask, launchDate: Date, date: Date}>): boolean {
    let date: Date;
    for (const task of tasks) {
      date = this.substractDays(task.date, Math.trunc(task.task.duration / this.workHours));
      if (date < task.launchDate) {
        console.log('%c date Launch : ' + task.launchDate, 'color : blue');
        return false;
      }
    }
    return true;
  }

  /*
   get the dates on which we should order, the supplier by whom we should order and stock at the end
   */
  getOrdersDates(commands: Command[], stocks: Stock[], suppliers: Supplier[]): Array<{material: Material, supplier: Supplier, date: Date, quantity: number}> {
    return this.getOrderDatesTask(this.getTasksFromCommands(commands), stocks, suppliers);
  }

  getOrderDatesTask(tasks: Array<{task: ManufacturingTask, launchDate: Date, date: Date, product: Product }>, stocks: Stock[],
                    suppliers: Supplier[]): Array<{material: Material, supplier: Supplier, date: Date, quantity: number}> {
    let dates: Array<{material: Material, supplier: Supplier, date: Date, quantity: number}> = [];
    let supplier: Supplier;
    let date: Date;
    let tmpTasks = tasks.slice();
    let securityStock = 0;
    tmpTasks = tmpTasks.sort(this.compareTasks);
    let currentTask: {task: ManufacturingTask, launchDate: Date, date: Date, product: Product };
    let tmpStock: number;
    if (!this.checkIfOrderPossibleWithoutStocks(tasks)) {
      console.log('order is not possible, time is too short');
      return dates;
    }
    while (tmpTasks.length > 0) {
      currentTask = tmpTasks.pop();
      date = this.substractDays(currentTask.date, Math.trunc(currentTask.task.duration / this.workHours));
      for (const material of currentTask.task.materials) {
        tmpStock = this.getStockFromArticle(stocks, material.material, date);
        securityStock = material.material['securityStock'] ? material.material['securityStock'] : 0;
        if (tmpStock < material.quantityUsed + securityStock) {

          if (material.material['securityStock']) {
            // if we haven't enough stock, order
            supplier = this.getSupplier(suppliers, <Material> material.material);
            dates.push({
              date: this.substractDays(date, supplier.deliveryTime),
              supplier: supplier,
              material: <Material>material.material,
              quantity: (<Material> material.material).maxStock - tmpStock
            });
            stocks.push({
              article: material.material,
              quantity: (<Material> material.material).maxStock - tmpStock,
              date: date
            });
          } else {
            console.log('unable to produce enough products' + tmpStock + ' ' + securityStock, stocks);
            return [];
          }
        }
        stocks.push({
          article: material.material,
          quantity: -material.quantityUsed,
          date: date
        });
      }
      stocks.push({
        article: currentTask.product,
        quantity: currentTask.task.quantity,
        date: date
      });
    }
    console.log('dates', dates);
    return dates;
  }

  getStockFromArticle(stocks: Stock[], material: Article, date: Date): number {
    let stock = 0;
    const stockFilterd = stocks.filter(o => o.article.id === material.id && o.article.name === material.name && new Date(o.date).getTime() <= date.getTime());
    stockFilterd.forEach(function (elem) {
      stock += elem.quantity;
    });
    return stock;
  }

  getSupplier(suppliers: Supplier[], material: Material): Supplier {
    return suppliers.filter(supplier => {
      return supplier.materials.filter(mat => {
          return mat['materialId'] === material.id;
        }).length > 0;
    })[0];
  }

  areOrdersPossible(commands: Command[], stocks: Stock[], suppliers: Supplier[]): boolean {
    return this.getOrdersDates(commands, stocks, suppliers).length > 0;
  }

  getCost(commands: Command[], stocks: Stock[], suppliers: Supplier[], hourCost: number = 1000): number {
    let res = 0;
    let numberOfMonth = 0;
    let tasks: Array<{task: ManufacturingTask, launchDate: Date, date: Date}> = this.getTasksFromCommands(commands);
    let materials: Array<{
      material: Material,
      price: number,
      growth: number,
      date: Date
    }>;
    for (let task of tasks) {
      res += hourCost * task.task.duration;
    }
    for (let order of this.getOrdersDates(commands, stocks, suppliers)) {
      materials = order.supplier.materials.filter(o => o['materialId'] === order.material.id);
      if (materials.length > 0) {
        numberOfMonth = this.getMonthBetween(new Date(materials[0].date), order.date);
        if (numberOfMonth < 0) {
          res += materials[0].price / Math.pow((1 + materials[0].growth), -numberOfMonth);
        } else {
          res += materials[0].price * Math.pow((1 + materials[0].growth), numberOfMonth);
        }
      }
    }
    return res;
  }

  getPriceFromCost(cost: number, margin: number): number {
    return cost * (1 + margin);
  }

  getMonthBetween(date1: Date, date2: Date): number {
    let res = 0;
    res += (date2.getFullYear() - date1.getFullYear()) * 12;
    res += date2.getMonth() - date1.getMonth();
    return res;
  }
}
