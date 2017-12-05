import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Supplier } from '@app-models';

@Component({
  selector: 'app-supplier-details-container',
  templateUrl: './supplier-details.component.html',
  styleUrls: ['./supplier-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierDetailsContainerComponent implements OnInit {

  @Input() supplier: Supplier;
  @Output() onEdit = new EventEmitter<Supplier>();
  @Output() onDelete = new EventEmitter<Supplier>();

  constructor() { }

  ngOnInit() {

  }

}
