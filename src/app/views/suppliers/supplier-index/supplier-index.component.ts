import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { Supplier } from '@app-models';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';

import * as suppliersActions from '../store/actions/suppliers-actions'
import * as fromRoot from '../store';


@Component({
  selector: 'app-suppliers-index',
  templateUrl: './supplier-index.component.html',
  styleUrls: ['./supplier-index.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierIndexComponent implements OnInit {

  suppliers$: Observable<Supplier[]>;

  constructor(public store: Store<fromRoot.State>, private router: Router, private actR: ActivatedRoute) { }

  ngOnInit() {
    // getAllSuppliers selector from the main store allows us to monitor changes only on id list from the main state
    // without monitoring the rest of the state
    this.suppliers$ = this.store.select(fromRoot.getAllSuppliers);
    this.store.dispatch(new suppliersActions.LoadAll());
  }

  editSupplier(obj: {type: string, data: Supplier}) {
    this.store.dispatch(new suppliersActions.SetCurrentSupplierId(obj.data.id));
    this.router.navigate([`/${obj.type}`, obj.data.id, 'edit']);
  }

  showSupplier(obj: {type: string, data: Supplier}) {
    this.store.dispatch(new suppliersActions.SetCurrentSupplierId(obj.data.id));
    this.router.navigate([`/${obj.type}`, obj.data.id]);
  }

  deleteSupplier(supplier: Supplier) {
    const r = confirm('Are you sure?');
    if (r) {
      this.store.dispatch(new suppliersActions.Delete(supplier.id));
    }
  }
}
