
import {Command} from '@app-models';

export class UtilsService {
  constructor() {}

  IsOrderPossible(commands: Command[] ): boolean {
    let quantity = 0;
    let tmpCommands = sortCommands(commands);
    for (const command of commands) {
      // change to dateCommande
      let numberOfDays = this.businessDaysBetweenDates(command.date, command.dateLivraison);
      for (const line of command.commandLines) {
        quantity += line.quantity;
      }
    }
    return true;
  }

  sortCommands(commands: Command[]): Command[] {
    let res = [];

    return res;
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
      8
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
