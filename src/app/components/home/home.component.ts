import {Component, OnInit} from '@angular/core';
import {UtilsService} from "../../services/utils.service";
import {Command} from "../../models/command";
import {utils} from "protractor";
import {Stock} from "../../models/stock";
import {Supplier} from "../../models/supplier";
import {CommandsService} from "../../services/commands.service";
import {SuppliersService} from "../../services/suppliers.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private util: UtilsService, private cs: CommandsService, private ss: SuppliersService) {

    let cmds: Command[] = [];
    let stocks: Stock[] = [ ];

    let suppliers$: Supplier[] = [];
    cs.index().subscribe( res => cmds = res);
    ss.index().subscribe( res => suppliers$ = res);
    // cmds = cs.index();

    // console.log(util.getMonthBetween(new Date('1/12/2014'), new Date('9/12/2015') ));
    console.log(util.getOrdersDates(cmds, stocks, suppliers$));
    // console.log(util.getTasksFromProduct(product, 1000, new Date));
    // util.getTasksFromCommands(cmds)); // util.IsOrderPossible(cmds, new Date('December 7, 2017 11:13:00'), stocks));
    // console.log(util.businessDaysBetweenDates(new Date('December 11, 2017 11:13:00'), new Date()));
  }

  ngOnInit() {
  }

}
