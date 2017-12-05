import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Supplier } from '@app-models';
import {Store, ActionsSubject} from '@ngrx/store';

import {State} from '../store';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

import * as fromRoot from '../store'
import * as suppliersActions from '../store/actions/suppliers-actions'


@Component({
  selector: 'app-supplier-edit',
  templateUrl: './supplier-edit.component.html',
  styleUrls: ['./supplier-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierEditComponent implements OnInit, OnDestroy {

  supplier$: Observable<Supplier>;
  redirectSub: Subscription;

  constructor(
    public store: Store<State>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private actionsSubject: ActionsSubject

  ) { }

  ngOnInit() {

    this.supplier$ = this.store.select(fromRoot.getCurrentSupplier);

    // If the update effect fires, we check if the current id is the one being updated, and redirect to its details
    this.redirectSub = this.actionsSubject
      .filter(action => action.type === suppliersActions.PATCH_SUCCESS)
      .filter((action: suppliersActions.PatchSuccess) => action.payload.id === +this.activatedRoute.snapshot.params['supplierId'])
      .subscribe((action: suppliersActions.PatchSuccess) => this.router.navigate(['/suppliers', action.payload.id]));

    this.activatedRoute.params.subscribe(params => {
      // update our id from the backend in case it was modified by another client
      this.store.dispatch(new suppliersActions.Load(+params['supplierId']));
    });

  }

  ngOnDestroy() {
    this.redirectSub.unsubscribe();
  }

  submitted(supplier: Supplier) {
    this.store.dispatch(new suppliersActions.Patch(supplier));
  }

}
