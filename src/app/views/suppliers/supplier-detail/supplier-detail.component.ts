import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import { Store, ActionsSubject} from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import { Supplier } from '@app-models';
import {Subscription} from 'rxjs/Subscription';

import * as suppliersActions from '../store/actions/suppliers-actions'
import * as fromRoot from '../store';
import {Material} from "../../../models/material";

@Component({
  selector: 'app-supplier-details',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierDetailComponent implements OnInit, OnDestroy {

  supplier$: Observable<Supplier>;
  materialLines$: Observable<any[]>;
  materials$: Observable<Material[]>;
  redirectSub: Subscription;
  route = '/suppliers';

  constructor(
    private store: Store<fromRoot.State>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private actionsSubject: ActionsSubject
  ) {
  }

  ngOnInit() {
    this.supplier$ = this.store.select(fromRoot.getCurrentSupplier);
    this.materials$ = this.store.select(fromRoot.getAllMaterials);
    this.materialLines$ = this.store.select(fromRoot.getSelectedSupplierMaterials);
    this.supplier$.subscribe(supplier => {
      if (supplier) {
        if (supplier.isCustomer) {
          this.route = '/customers';
        } else {
          this.route = '/suppliers';
          this.store.dispatch(new suppliersActions.GetSupplierMaterials(supplier.id));
        }
      }
    });

    // If the destroy effect fires, we check if the current id is the one being viewed, and redirect to index
    this.redirectSub = this.actionsSubject
      .filter(action => action.type === suppliersActions.DELETE_SUCCESS)
      .filter((action: suppliersActions.DeleteSuccess) => action.payload === +this.activatedRoute.snapshot.params['supplierId'])
      .subscribe(_ => this.router.navigate([this.route]));

    this.activatedRoute.params.subscribe(params => {
      // update our id from the backend in case it was modified by another client
      this.store.dispatch(new suppliersActions.Load(+params['supplierId']));
    });
  }

  editSupplier(supplier: Supplier) {
    this.store.dispatch(new suppliersActions.SetCurrentSupplierId(supplier.id));
    this.router.navigate([this.route, supplier.id, 'edit']);
  }

  deleteSupplier(supplier: Supplier) {
    const r = confirm('Are you sure?');
    if (r) {
      this.store.dispatch(new suppliersActions.Delete(supplier.id));
    }
  }

  ngOnDestroy() {
    this.redirectSub.unsubscribe();
  }
}
