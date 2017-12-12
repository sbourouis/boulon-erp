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
    article: '',
    quantity: 0,
    price: 0
  };

  @Output() onSubmit = new EventEmitter<Product>();

  form: FormGroup;
  constructor(public formBuilder: FormBuilder) {


    this.form = this.formBuilder.group({
      'id': [this.product.id],
      'name': [this.product.name, Validators.required],
      'quantity': [this.product.quantity],
      'price': [this.product.price],
      'article': [this.product.article],
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








