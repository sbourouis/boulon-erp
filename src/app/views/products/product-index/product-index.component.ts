import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { Supplier } from '@app-models';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';

import * as productsActions from '../store/actions/products-actions'
import * as fromRoot from '../store';
import {Product} from "../../../models/product";
@Component({
  selector: 'app-product-index',
  templateUrl: './product-index.component.html',
  styleUrls: ['./product-index.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductIndexComponent implements OnInit {

  products$: Observable<Product[]>;

  constructor(public store: Store<fromRoot.State>, private router: Router, private actR: ActivatedRoute) { }

  ngOnInit() {
    // getAllSuppliers selector from the main store allows us to monitor changes only on id list from the main state
    // without monitoring the rest of the state
    this.products$ = this.store.select(fromRoot.getAllProducts);
    this.store.dispatch(new productsActions.LoadAll());
  }

  editProduct(obj: {type: string, data: Supplier}) {
    this.store.dispatch(new productsActions.SetCurrentProductId(obj.data.id));
    this.router.navigate([`/${obj.type}`, obj.data.id, 'edit']);
  }

  showProduct(obj: {type: string, data: Product}) {
    this.store.dispatch(new productsActions.SetCurrentProductId(obj.data.id));
    this.router.navigate([`/${obj.type}`, obj.data.id]);
  }

  deleteProduct(product: Product) {
    const r = confirm('Are you sure?');
    if (r) {
      this.store.dispatch(new productsActions.Delete(product.id));
    }
  }
}

