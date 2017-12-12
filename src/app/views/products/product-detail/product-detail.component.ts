import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import { Store, ActionsSubject} from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import { Product } from '@app-models';
import {Subscription} from 'rxjs/Subscription';

import * as productsActions from '../store/actions/products-actions';
import * as fromRoot from '../store';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  product$: Observable<Product>;
  redirectSub: Subscription;
  route = '/products';
  constructor(    private store: Store<fromRoot.State>,
                  private activatedRoute: ActivatedRoute,
                  private router: Router,
                  private actionsSubject: ActionsSubject) { }

  ngOnInit() {
    this.product$ = this.store.select(fromRoot.getCurrentProduct);


    // If the destroy effect fires, we check if the current id is the one being viewed, and redirect to index
    this.redirectSub = this.actionsSubject
      .filter(action => action.type === productsActions.DELETE_SUCCESS)
      .filter((action: productsActions.DeleteSuccess) => action.payload === +this.activatedRoute.snapshot.params['supplierId'])
      .subscribe(_ => this.router.navigate([this.route]));

    this.activatedRoute.params.subscribe(params => {
      // update our id from the backend in case it was modified by another client
      this.store.dispatch(new productsActions.Load(+params['supplierId']));
    });
  }

  editProduct(product: Product) {
    this.store.dispatch(new productsActions.SetCurrentProductId(product.id));
    this.router.navigate([this.route, product.id, 'edit']);
  }

  deleteProduct(supplier: Product) {
    const r = confirm('Are you sure?');
    if (r) {
      this.store.dispatch(new productsActions.Delete(supplier.id));
    }
  }

  ngOnDestroy() {
    this.redirectSub.unsubscribe();
  }

}


