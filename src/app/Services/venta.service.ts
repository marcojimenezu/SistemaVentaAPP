import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ResponseApi } from '../Interfaces/response-api';

import { Venta } from '../Interfaces/venta';

@Injectable({
  providedIn: 'root',
})
export class VentaService {
  private apiUrl: string = environment.endpoint + 'Venta/';

  constructor(private http: HttpClient) {}

  registrar(request: Venta): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.apiUrl}Registrar`, request);
  }

  historial(
    buscarPor: string,
    numeroVenta: string,
    fechaInicio: string,
    fechaFin: string
  ): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(
      `${this.apiUrl}Historial?buscarPor=${buscarPor}&numeroVenta=${numeroVenta}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
    );
  }

  reporte(fechaInicio: string, fechaFin: string): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(
      `${this.apiUrl}Reporte?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
    );
  }
}
