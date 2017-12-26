import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Product} from "@app-models";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ManufacturingTask} from "../models/manufacturingTask";
import {Material} from "../models/material";

@Injectable()
export class ProductsService {

  constructor(private http: HttpClient) {
  }

  index(): Observable<Product[]> {
    return this.http
      .get<Product[]>(`${environment.appApi.baseUrl}/products`);
  }

  show(productId: number): Observable<Product> {
    return this.http
      .get<Product>(`${environment.appApi.baseUrl}/products/${productId}`);

  }

  getManufacturingTasks(): Observable<ManufacturingTask[]> {
    return this.http
      .get<ManufacturingTask[]>(`${environment.appApi.baseUrl}/manufacturingTasks`);
  }

  getMaterialsUsed(): Observable<any[]> {
    return this.http
      .get<any[]>(`${environment.appApi.baseUrl}/materialsUsed`);
  }

  getProductsUsed(): Observable<any[]> {
    return this.http
      .get<any[]>(`${environment.appApi.baseUrl}/productsUsed`);
  }

  getMaterials(): Observable<Material[]> {
    return this.http
      .get<Material[]>(`${environment.appApi.baseUrl}/materials`);
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
