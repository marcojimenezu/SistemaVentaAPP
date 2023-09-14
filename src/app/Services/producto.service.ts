import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ResponseApi } from '../Interfaces/response-api';

import { Producto } from '../Interfaces/producto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private apiUrl: string = environment.endpoint + 'Producto/';

  constructor(private http: HttpClient) {}

  lista(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.apiUrl}Lista`);
  }

  guardar(request: Producto): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.apiUrl}Guardar`, request);
  }

  editar(request: Producto): Observable<ResponseApi> {
    return this.http.put<ResponseApi>(`${this.apiUrl}Editar`, request);
  }

  eliminar(id: number): Observable<ResponseApi> {
    return this.http.delete<ResponseApi>(`${this.apiUrl}Eliminar/${id}`);
  }
}
