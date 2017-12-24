import {Component, OnInit} from '@angular/core';
import {UtilsService} from "../../services/utils.service";
import {Command} from "../../models/command";
import {Stock} from "../../models/stock";
import {Supplier} from "../../models/supplier";
import {CommandsService} from "../../services/commands.service";
import {SuppliersService} from "../../services/suppliers.service";
import {StocksService} from "../../services/stocks.service";
import {Observable} from "rxjs";
import {ProductsService} from "../../services/products.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
  cmds$: Observable<Command[]>;


  constructor(private util: UtilsService,
              private cs: CommandsService,
              private ss: SuppliersService,
              private sts: StocksService,
              private ps: ProductsService) {
    // console.log(util.businessDaysBetweenDates(new Date('October 1, 1969 11:13:00'), new Date('February 20, 1970 11:13:00')));

    this.cmds$ = cs.index();
    this.prepareData().subscribe(data => {
      console.log(util.getOrdersDates(data.commands, data.stock, data.customers));
    });

    // let cmds: Command[] = [];
    // let stocks: Stock[] = [ ];
    //
    // let suppliers$: Supplier[] = [];
    // cs.getProductsStock().map((commandes: Command[]) => cmds = commandes);
    // ss.getProductsStock().subscribe( res => suppliers$ = res);
    // sts.getProductsStock().subscribe(res => stocks = res);
    //
    // console.log(cmds);
    // // cmds = cs.getProductsStock();
    // let test = new Date();
    // console.log(test);
    // test.setHours(test.getHours() + 10);
    // console.log(test);
    // console.log(util.getMonthBetween(new Date('1/12/2014'), new Date('9/12/2015') ));
    // console.log(util.getOrdersDates(cmds, stocks, suppliers$));
    // console.log(util.getTasksFromProduct(product, 1000, new Date));
    // util.getTasksFromCommands(cmds)); // util.IsOrderPossible(cmds, new Date('December 7, 2017 11:13:00'), stocks));

  }

  ngOnInit() {
  }

  prepareData(): Observable<{commands: Array<Command>, stock: Array<Stock>, customers: Array<Supplier>}> {
    return Observable.create( obs => {
      this.ss.route = 'customers';
      this.ps.getMaterials().subscribe(materials => {
        this.ps.getProductsUsed().subscribe(pu => {
          this.ps.getMaterialsUsed().subscribe(mu => {
            mu.map(mat => {
              mat.material = materials.filter(material => material.id == mat.materialId)[0];
            });
            this.ps.getManufacturingTasks().subscribe(mt => {
              mt.map(task => {
                task.materials = mu.filter(material => material['manufacturingTaskId'] == task.id);
              });
              this.ps.index().subscribe(products => {
                products.map(product => {
                  product.manufacturingTasks = mt.filter(task => task['productId'] == product.id);
                });
                pu.map(product => {
                  product.product = products.filter(p => p.id == product['productId'])[0];
                });
                mt.map(task => {
                  task.materials = task.materials.concat(pu.filter(prod => prod['manufacturingTaskId'] == task.id));
                });
                this.ss.index().subscribe(customers => {
                  this.cs.index().subscribe(cmds => {
                    cmds.map(cmd => {
                      cmd.supplier = customers.filter(supplier => supplier.id == cmd['customerId'])[0];
                      cmd.product = products.filter(product => product.id == cmd['productId'])[0];
                    });
                    this.sts.getProductsStock().subscribe(productStock => {
                      productStock.map(ps => {
                        ps.article = products.filter(product => product.id == ps['productId'])[0];
                      });
                      this.sts.getMaterialsStock().subscribe(materialStock => {
                        materialStock.map(ms => {
                          ms.article = materials.filter(material => material.id == ms['materialId'])[0];
                          if (ms.id === materialStock.length) {
                            obs.next({
                              commands: cmds,
                              stock: materialStock.concat(productStock),
                              customers: customers
                            });
                          }
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  }

}
