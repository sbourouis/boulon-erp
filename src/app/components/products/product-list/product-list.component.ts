import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Product } from '@app-models';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../../store';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {

  @Input() products: Product[];
  @Output() onEdit = new EventEmitter<{type: string, data: Product}>();
  @Output() onShow = new EventEmitter<{type: string, data: Product}>();
  @Output() onDelete = new EventEmitter<Product>();
  type = 'suppliers';

  productsTrackByFn = (index: number, product: Product) => product.id;
  constructor() { }

  ngOnInit() {
  }
  showDetails(product: Product) {
    this.onShow.emit({type: this.type, data: product});
  }

  editSupplier(product: Product) {
    this.onEdit.emit({type: this.type, data: product});
  }

  deleteSupplier(product: Product) {
    this.onDelete.emit(product);
  }
}
