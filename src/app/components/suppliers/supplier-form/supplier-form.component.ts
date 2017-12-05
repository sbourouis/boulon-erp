import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import { Supplier } from '@app-models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as fromRoot from '@app-root-store';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierFormComponent implements OnInit, OnChanges {

  @Input() supplier: Supplier = {
    id: undefined,
    type: 'Particulier',
    name: '',
    address: '',
    email: '',
    isCustomer: false,
    phoneNumber: '',
    position: '',
    comment: ''
  };

  @Output() onSubmit = new EventEmitter<Supplier>();

  form: FormGroup;

  constructor(public formBuilder: FormBuilder, private store: Store<fromRoot.State>) {
    this.store.select(fromRoot.getIsCustomer).subscribe(isCustomer => this.supplier.isCustomer = isCustomer);
    this.form = this.formBuilder.group({
      'id': [this.supplier.id],
      'tyoe': [this.supplier.type],
      'name': [this.supplier.name, Validators.required],
      'email': [this.supplier.email],
      'phoneNumber': [this.supplier.phoneNumber],
      'address': [this.supplier.address],
      'position': [this.supplier.position],
      'comment': [this.supplier.comment]
    });
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.supplier) {
      this.form.patchValue(this.supplier);
    }
  }

  submit() {
    if (this.form.valid) {
      this.onSubmit.emit(this.form.value);
    }
  }
}
