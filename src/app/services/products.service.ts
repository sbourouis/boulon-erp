import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Product } from '@app-models';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ProductsService {

  constructor(private http: HttpClient) {}

  /**
   * Returns a list of products
   * @returns {Observable<Object>}
   */
  index(): Observable<Product[]> {
    return this.http
        .get<Product[]>(`${environment.appApi.baseUrl}/products`);
  }

  show(productId: number): Observable<Product> {
    return this.http
        .get<Product>(`${environment.appApi.baseUrl}/products/${productId}`);

  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(`${environment.appApi.baseUrl}/products`, product);
  }

  update(product: Product): Observable<Product> {
    return this.http.patch<Product>(`${environment.appApi.baseUrl}/products/${product.id}`, product);
  }

  destroy(id: number): Observable<Product> {
    return this.http.delete<Product>(`${environment.appApi.baseUrl}/products/${id}`);
  }
}
