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
import {Material} from "../../models/material";
import {Product} from "../../models/product";

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private util: UtilsService,
              private cs: CommandsService,
              private ss: SuppliersService,
              private sts: StocksService,
              private ps: ProductsService) {
    this.prepareData().subscribe(data => {
      console.log(util.getOrdersDates(data.commands, data.stock, data.suppliers));
    });
  }

  ngOnInit() {
  }

  prepareData(): Observable<{commands: Array<Command>, stock: Array<Stock>, suppliers: Array<Supplier>}> {
    return Observable.create(obs => {
      this.ss.route = 'customers';
      this.ps.getMaterials().subscribe((materials: Material[]) => {
        this.ps.getProductsUsed().subscribe((pu) => {
          this.ps.getMaterialsUsed().subscribe(mu => {
            mu.map(mat => {
              mat.material = materials.filter(material => material.id == mat.materialId)[0];
            });
            this.ps.getManufacturingTasks().subscribe(mt => {
              mt.map(task => {
                task.materials = mu.filter(material => material['manufacturingTaskId'] == task.id);
              });
              this.ps.index().subscribe((products: Product[]) => {
                products.map(product => {
                  product.manufacturingTasks = mt.filter(task => task['productId'] == product.id);
                });
                pu.map(product => {
                  product.material = products.filter(p => p.id == product['productId'])[0];
                });
                mt.map(task => {
                  task.materials = task.materials.concat(pu.filter(prod => prod['manufacturingTaskId'] == task.id));
                });
                this.ss.getMaterialLines().subscribe(ml => {
                  this.ss.index().subscribe(customers => {
                    this.ss.route = 'suppliers';
                    this.ss.index().subscribe(suppliers => {
                      suppliers.map(supplier => supplier.materials = ml.filter(mat => mat.id == supplier['materialsId']));
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
                                  suppliers: suppliers
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
      })
    });
  }

}
