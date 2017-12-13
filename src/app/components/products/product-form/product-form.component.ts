import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import { Product } from '@app-models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFormComponent implements OnInit, OnChanges {

  @Input() product: Product = {
    id: undefined,
    name: '',
    price: 0,
    manufacturingTasks: undefined
  };

  @Output() onSubmit = new EventEmitter<Product>();

  form: FormGroup;
  constructor(public formBuilder: FormBuilder) {


    this.form = this.formBuilder.group({
      'id': [this.product.id],
      'name': [this.product.name, Validators.required],
      'price': [this.product.price],
      'manufacturingTasks': [this.product.manufacturingTasks]
    });
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.product) {
      this.form.patchValue(this.product);
    }
  }

  submit() {
    if (this.form.valid) {
      this.onSubmit.emit(this.form.value);
    }
  }

}








