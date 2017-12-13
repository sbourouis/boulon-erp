import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Material } from '@app-models';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import * as fromRoot from '../store';
import {Store} from '@ngrx/store';

@Injectable()
export class MaterialsService {

  constructor(private http: HttpClient) {}

  /**
   * Returns a list of materials
   * @returns {Observable<Object>}
   */
  index(): Observable<Material[]> {
    return this.http
        .get<Material[]>(`${environment.appApi.baseUrl}/materials`);
  }

  show(materialId: number): Observable<Material> {
    return this.http
        .get<Material>(`${environment.appApi.baseUrl}/materials/${materialId}`);

  }

  create(material: Material): Observable<Material> {
    return this.http.post<Material>(`${environment.appApi.baseUrl}/materials`, material);
  }

  update(material: Material): Observable<Material> {
    return this.http.patch<Material>(`${environment.appApi.baseUrl}/materials/${material.id}`, material);
  }

  destroy(id: number): Observable<Material> {
    return this.http.delete<Material>(`${environment.appApi.baseUrl}/materials/${id}`);
  }
}
