import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { STAVKA_PORUDZBINE_URL, STAVKA_PORUDZBINE_ZAPORUDZBINU_URL } from '../app.constants';
import { StavkaPorudzbine } from '../models/stavkaPorudzbine';

@Injectable({
  providedIn: 'root'
})
export class StavkaPorudzbineService {

  constructor(private httpClient: HttpClient) { }

  public getStavkeZaPorudzbinaID(idPorudzbine: number): Observable<any> {
    return this.httpClient.get(`${STAVKA_PORUDZBINE_ZAPORUDZBINU_URL}/${idPorudzbine}`);
  }

  public addStavkaPorudzbine(stavkaPor: StavkaPorudzbine): Observable<any> {
    stavkaPor.id = 150;
    return this.httpClient.post(`${STAVKA_PORUDZBINE_URL}`, stavkaPor);
  }

  public updateStavkaPorudzbine(stavkaPor: StavkaPorudzbine): Observable<any> {
    return this.httpClient.put(`${STAVKA_PORUDZBINE_URL}`, stavkaPor);
  }

  public deleteStavkaPorudzbine(id: number): Observable<any> {
    return this.httpClient.delete(`${STAVKA_PORUDZBINE_URL}/${id}`);
  }
}
