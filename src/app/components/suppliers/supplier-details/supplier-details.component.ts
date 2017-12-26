import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Supplier } from '@app-models';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../../store';
import {Material} from "../../../models/material";

@Component({
  selector: 'app-supplier-details-container',
  templateUrl: './supplier-details.component.html',
  styleUrls: ['./supplier-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierDetailsContainerComponent implements OnInit {

  @Input() supplier: Supplier;
  @Input() materialLines: any;
  @Input() materials: Material[];
  @Output() onEdit = new EventEmitter<Supplier>();
  @Output() onDelete = new EventEmitter<Supplier>();
  type = 'Supplier';

  constructor(private store: Store<fromRoot.State>) {
    this.store.select(fromRoot.getIsCustomer).subscribe(isCustomer => this.type = isCustomer ? 'Customer' : 'Supplier');
  }

  ngOnInit() {
  }

  getMaterialName(id): string {
    const material = this.materials.filter(material => material.id == id)[0];
    return material ? material.name : '';
  }
}
