import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Supplier } from '@app-models';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierListComponent implements OnInit {

  @Input() suppliers: Supplier[];
  @Output() onEdit = new EventEmitter<Supplier>();
  @Output() onShow = new EventEmitter<Supplier>();
  @Output() onDelete = new EventEmitter<Supplier>();

  suppliersTrackByFn = (index: number, supplier: Supplier) => supplier.id;

  constructor() {}

  ngOnInit() {}

  showDetails(supplier: Supplier) {
    this.onShow.emit(supplier);
  }

  editSupplier(supplier: Supplier) {
    this.onEdit.emit(supplier)
  }

  deleteSupplier(supplier: Supplier) {
    this.onDelete.emit(supplier)
  }
}
