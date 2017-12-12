
import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Product } from '@app-models';
import {Store, ActionsSubject} from '@ngrx/store';

import {State} from '../store';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

import * as fromRoot from '../store';
import * as productsActions from '../store/actions/products-actions';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductEditComponent implements OnInit, OnDestroy {

  product$: Observable<Product>;
  redirectSub: Subscription;
  route = '/products';
  constructor(    public store: Store<State>,
                  private activatedRoute: ActivatedRoute,
                  private router: Router,
                  private actionsSubject: ActionsSubject) { }

  ngOnInit() {
    this.product$ = this.store.select(fromRoot.getCurrentProduct);
    this.product$.subscribe(product => {
      if (product) {
       // this.route = product.isBuilt ? '/builtProducts' : '/buyProducts';
      }
    });

  // If the update effect fires, we check if the current id is the one being updated, and redirect to its details
  this.redirectSub = this.actionsSubject
    .filter(action => action.type === productsActions.PATCH_SUCCESS)
    .filter((action: productsActions.PatchSuccess) => action.payload.id === +this.activatedRoute.snapshot.params['productId'])
    .subscribe((action: productsActions.PatchSuccess) => this.router.navigate([this.route, action.payload.id]));

  this.activatedRoute.params.subscribe(params => {
  // update our id from the backend in case it was modified by another client
  this.store.dispatch(new productsActions.Load(+params['productId']));
});

}

ngOnDestroy() {
  this.redirectSub.unsubscribe();
}

submitted(product: Product) {
  this.store.dispatch(new productsActions.Patch(product));
}

}




