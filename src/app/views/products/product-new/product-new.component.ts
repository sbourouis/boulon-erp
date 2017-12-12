
import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import { Product } from '@app-models';
import {ActionsSubject, Store} from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';
import * as fromProducts from '../store';
import * as productsActions from '../store/actions/products-actions';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductNewComponent implements OnInit, OnDestroy {

  redirectSub: Subscription;

  constructor  (private store: Store<fromProducts.State>,
  private router: Router,
  private actionsSubject: ActionsSubject) {

  }

  ngOnInit() {
    this.redirectSub = this.actionsSubject
      .asObservable()
      .filter(action => action.type === productsActions.CREATE_SUCCESS)
      .subscribe((action: productsActions.CreateSuccess) => {
        // const route = action.payload.isCustomer ? '/customers' : '/suppliers';
        // this.router.navigate([route, action.payload.id]);
      });
  }

  ngOnDestroy() {
    this.redirectSub.unsubscribe();
  }

  submitted(product: Product) {
    this.store.dispatch(new productsActions.Create(product));
  }

}



