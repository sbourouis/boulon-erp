import { Component, OnInit } from '@angular/core';
import {UtilsService} from "../../services/utils.service";
import {Command} from "../../models/command";

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private util: UtilsService) {
    let cmd: Command = {
      id: 0,
      date: new Date(),
      dateLivraison: new Date(),
      supplier:
        {
          id: 0,
    type: 'Particulier',
    name: 'supplier 0',
    address: 'adresse',
    position: 'position',
    phoneNumber: '0632796707',
    isCustomer: true,
    email: 'test@gmail.com',
    comment: '',
    deliveryTime: 2,
        },
      commandLines: [{
        id: 0,
      article: {
        id: 0,
        name: 'product',
        price: 10,

        manufacturingTasks:
        [
          {
            id: 0,
            machine:
            {
              id: 0,
              name: 'machine'
            },
            duration: 2,
            materials:
              [
                {
                  id: 0,
                  name: 'article',
                  price: 0
                }
              ],
            quantity: 1000,
            quantityUsed:
            [
              1
            ]
          }
        ]
      },
      quantity: 7000,
      price: 10
    }],
      discount: 0
    };
    let cmds: Command[] = [];
    let stocks = [
      {
        id: 0,
        article:
          {
            id: 0,
            name: 'article',
            price: 0
          },
        quantity: 9,
        date: new Date()
      }
    ];
    cmds.push(cmd);
    console.log(util.IsOrderPossible(cmds, new Date('December 7, 2017 11:13:00'), stocks));
   // console.log(util.businessDaysBetweenDates(new Date('December 11, 2017 11:13:00'), new Date()));
  }

  ngOnInit() {
  }

}
