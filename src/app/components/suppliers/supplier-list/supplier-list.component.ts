import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Supplier } from '@app-models';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../../store';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierListComponent implements OnInit {

  @Input() suppliers: Supplier[];
  @Output() onEdit = new EventEmitter<{type: string, data: Supplier}>();
  @Output() onShow = new EventEmitter<{type: string, data: Supplier}>();
  @Output() onDelete = new EventEmitter<Supplier>();
  type = 'suppliers';

  suppliersTrackByFn = (index: number, supplier: Supplier) => supplier.id;

  constructor(private store: Store<fromRoot.State>) {
    this.store.select(fromRoot.getIsCustomer).subscribe(isCustomer => this.type = isCustomer ? 'customers' : 'suppliers');
  }

  ngOnInit() {}

  showDetails(supplier: Supplier) {
    this.onShow.emit({type: this.type, data: supplier});
  }

  editSupplier(supplier: Supplier) {
    this.onEdit.emit({type: this.type, data: supplier});
  }

  deleteSupplier(supplier: Supplier) {
    this.onDelete.emit(supplier);
  }
}
