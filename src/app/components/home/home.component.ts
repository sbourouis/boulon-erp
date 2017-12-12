import { Component, OnInit } from '@angular/core';
import {UtilsService} from "../../services/utils.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private util: UtilsService) {
    console.log(util.businessDaysBetweenDates(new Date('December 11, 2017 11:13:00'), new Date()));
  }

  ngOnInit() {
  }

}
