import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Stock} from "../models/stock";

@Injectable()
export class StocksService {

  constructor(private http: HttpClient) {}

  /**
   * Returns a list of suppliers
   * @returns {Observable<Object>}
   */
  getProductsStock(): Observable<Stock[]> {
    return this.http
        .get<Stock[]>(`${environment.appApi.baseUrl}/stockProducts`);
  }

  getMaterialsStock(): Observable<Stock[]> {
    return this.http
      .get<Stock[]>(`${environment.appApi.baseUrl}/stockMaterials`);
  }

  show(stockId: number): Observable<Stock> {
    return this.http
        .get<Stock>(`${environment.appApi.baseUrl}/stockProducts/${stockId}`);

  }

  create(stock: Stock): Observable<Stock> {
    return this.http.post<Stock>(`${environment.appApi.baseUrl}/stockProducts`, stock);
  }

  update(stock: Stock): Observable<Stock> {
    return this.http.patch<Stock>(`${environment.appApi.baseUrl}/stockProducts/${stock.id}`, stock);
  }

  destroy(id: number): Observable<Stock> {
    return this.http.delete<Stock>(`${environment.appApi.baseUrl}/stockProducts/${id}`);
  }
}
