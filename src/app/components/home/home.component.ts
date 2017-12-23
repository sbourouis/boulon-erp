import {Component, OnInit} from '@angular/core';
import {UtilsService} from "../../services/utils.service";
import {Command} from "../../models/command";
import {utils} from "protractor";
import {Stock} from "../../models/stock";
import {Supplier} from "../../models/supplier";

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private util: UtilsService) {
    let cmd: Command = {
      id: 0,
      date: new Date('10/23/2015'),
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
          materials: undefined,
          deliveryTime: 2,
        },
      commandLines: [{
        id: 0,
        article: {
          id: 0,
          name: 'product',
          price: 10,
          manufacturingTasks: [
            {
              id: 0,
              machine: {
                id: 0,
                name: 'machine'
              },
              duration: 2,
              materials: [
                {
                  material: {
                    id: 0,
                    name: 'article',
                    price: 0,
                  },
                  quantityUsed: 1
                }
              ],
            quantity: 1000
          },
            {
              id: 1,
              machine: {
                id: 1,
                name: 'machine'
              },
              duration: 2,
              materials: [
                {
                  material: {
                    id: 0,
                    name: 'article',
                    price: 0
                  },
                  quantityUsed: 1
                }
              ],
              quantity: 1000
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
            price: 0,
            securityStock: 1,
            maxStock: 50
          },
        quantity: 9,
        date: new Date('10/15/2015')
      },
      {
        id: 1,
        article:
          {
            id: 1,
            name: 'article',
            price: 0,
            securityStock: 1,
            maxStock: 50
          },
        quantity: 9,
        date: new Date('10/15/2015')
      }
    ];
    cmds.push(cmd);
    cmd = {
      id: 1,
      date: new Date('09/23/2015'),
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
          materials: undefined,
          deliveryTime: 2,
        },
      commandLines: [{
        id: 0,
        article: {
          id: 0,
          name: 'product',
          price: 10,
          manufacturingTasks: [
            {
              id: 0,
              machine: {
                id: 1,
                name: 'machine'
              },
              duration: 2,
              materials: [
                {
                  material: {
                    id: 1,
                    name: 'article',
                    price: 0
                  },
                  quantityUsed: 1
                }
              ],
              quantity: 1000
            },
            {
              id: 1,
              machine: {
                id: 0,
                name: 'machine'
              },
              duration: 2,
              materials: [
                {
                  material: {
                    id: 0,
                    name: 'article',
                    price: 0
                  },
                  quantityUsed: 1
                }
              ],
              quantity: 1000
            }
          ]
        },
        quantity: 7000,
        price: 10
      }],
      discount: 0
    };
    cmds.push(cmd);
    let product  = {
      id: 0,
        name: 'product',
        price: 10,
        manufacturingTasks: [
        {
          id: 0,
          machine: {
            id: 1,
            name: 'machine'
          },
          duration: 2,
          materials: [
            {
              material: {
                id: 1,
                name: 'article',
                price: 0,
                securityStock: 1,
                maxStock: 50
              },
              quantityUsed: 1
            }
          ],
          quantity: 1000
        },
        {
          id: 1,
          machine: {
            id: 0,
            name: 'machine'
          },
          duration: 2,
          materials: [
            {
              material: {
                id: 0,
                name: 'article',
                price: 0,
                manufacturingTasks: [
                  {
                    id: 2,
                    machine: {
                      id: 0,
                      name: 'machine'
                    },
                    duration: 2,
                    materials: [
                      {
                        material: {
                          id: 0,
                          name: 'article',
                          price: 0,
                          securityStock: 1,
                          maxStock: 50
                        },
                        quantityUsed: 1
                      }
                    ],
                    quantity: 1000
                  }
                ],
                securityStock: 1,
                maxStock: 50
              },
              quantityUsed: 1
            }
          ],
          quantity: 1000
        }
      ]
    };

    let suppliers$ = [
      {
        id: 0,
        name: 'supplier 1',
        deliveryTime: 2,
        materials: [{
          material: {
            id: 0,
            name: 'article',
            price: 0,
            securityStock: 1,
            maxStock: 50
          } ,
          price: 100,
          growth: 0.2,
          date: new Date('10/12/2013')
         }
    ]}];
    console.log(util.getMonthBetween(new Date('1/12/2014'), new Date('9/12/2015') ));
    console.log(util.getOrdersDates(cmds, stocks, suppliers$));
    // console.log(util.getTasksFromProduct(product, 1000, new Date));
    // util.getTasksFromCommands(cmds)); // util.IsOrderPossible(cmds, new Date('December 7, 2017 11:13:00'), stocks));
    // console.log(util.businessDaysBetweenDates(new Date('December 11, 2017 11:13:00'), new Date()));
  }

  ngOnInit() {
  }

}
