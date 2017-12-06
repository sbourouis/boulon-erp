import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import { Supplier } from '@app-models';
import {ActionsSubject, Store} from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';

import * as suppliersActions from '../store/actions/suppliers-actions'
import * as fromRoot from '../store';

import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-supplier-new',
  templateUrl: './supplier-new.component.html',
  styleUrls: ['./supplier-new.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierNewComponent implements OnInit, OnDestroy {

  redirectSub: Subscription;

  constructor(
    private store: Store<fromRoot.State>,
    private router: Router,
    private actionsSubject: ActionsSubject
  ) {}

  ngOnInit() {
    this.redirectSub = this.actionsSubject
      .asObservable()
      .filter(action => action.type === suppliersActions.CREATE_SUCCESS)
      .subscribe((action: suppliersActions.CreateSuccess) => {
        const route = action.payload.isCustomer ? '/customers' : '/suppliers';
        this.router.navigate([route, action.payload.id]);
      });
  }

  ngOnDestroy() {
    this.redirectSub.unsubscribe();
  }

  submitted(supplier: Supplier) {
    this.store.dispatch(new suppliersActions.Create(supplier));
  }
}
