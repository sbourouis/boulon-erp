import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Supplier } from '@app-models';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class SuppliersService {
  constructor(private http: HttpClient ) { }

  /**
   * Returns a list of suppliers
   * @returns {Observable<Object>}
   */
  index(): Observable<Supplier[]> {
    return this.http
        .get<Supplier[]>(`${environment.appApi.baseUrl}/suppliers`)
  }

  show(supplierId: number): Observable<Supplier> {
    return this.http
        .get<Supplier>(`${environment.appApi.baseUrl}/suppliers/${supplierId}`)

  }

  create(supplier: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(`${environment.appApi.baseUrl}/suppliers`, supplier)
  }

  update(supplier: Supplier): Observable<Supplier> {
    return this.http.patch<Supplier>(`${environment.appApi.baseUrl}/suppliers/${supplier.id}`, supplier)
  }

  destroy(id: string): Observable<Supplier> {
    return this.http.delete<Supplier>(`${environment.appApi.baseUrl}/suppliers/${id}`)
  }
}
