import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaCreditoService {
  private myAppUrl = 'https://localhost:44338/';
  private myApiUrl = 'api/tarjetaCredito/';

  constructor(private http: HttpClient) { }

  getListTarjetas(): Observable<any>
  {
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }

  deleteTarjeta(id: number): Observable<any>
  {
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }

  postTarjeta(tarjeta: any): Observable<any>
  {
    return this.http.post(this.myAppUrl + this.myApiUrl, tarjeta);
  }

  updateTarjeta(id: number, tarjeta: any): Observable<any>
  {
    return this.http.put(this.myAppUrl + this.myApiUrl + id, tarjeta);
  }
}
