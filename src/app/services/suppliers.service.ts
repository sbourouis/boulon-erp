import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Supplier } from '@app-models';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import * as fromRoot from '../store';
import {Store} from '@ngrx/store';

@Injectable()
export class SuppliersService {
  route = 'suppliers';

  constructor(private http: HttpClient, private store: Store<fromRoot.State>) {
    this.store.select(fromRoot.getIsCustomer).subscribe(isCustomer => this.route = isCustomer ? 'customers' : 'suppliers');
  }

  /**
   * Returns a list of suppliers
   * @returns {Observable<Object>}
   */
  index(): Observable<Supplier[]> {
    return this.http
        .get<Supplier[]>(`${environment.appApi.baseUrl}/${this.route}`);
  }

  show(supplierId: number): Observable<Supplier> {
    return this.http
        .get<Supplier>(`${environment.appApi.baseUrl}/${this.route}/${supplierId}`);

  }

  create(supplier: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(`${environment.appApi.baseUrl}/${this.route}`, supplier);
  }

  update(supplier: Supplier): Observable<Supplier> {
    return this.http.patch<Supplier>(`${environment.appApi.baseUrl}/${this.route}/${supplier.id}`, supplier);
  }

  destroy(id: string): Observable<Supplier> {
    return this.http.delete<Supplier>(`${environment.appApi.baseUrl}/${this.route}/${id}`);
  }
}
