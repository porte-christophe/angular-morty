import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Planet } from '../types/planet.type';
import { ApiResponse, InfoResponse } from '../../../shared/types/api-response.types';

@Injectable({
  providedIn: 'root',
})
export class PlanetsService {
  private readonly http = inject(HttpClient);
  private planets = signal<Planet[]>([]);
  private infos = signal<InfoResponse>({} as InfoResponse);
  readonly planetSignal = this.planets.asReadonly();
  readonly url = 'https://rickandmortyapi.com/api/location/';

  getInfos(){
    return this.infos;
  }
  getInfosFromService(): Observable<ApiResponse<Planet[]>> {
    return this.http
      .get<ApiResponse<Planet[]>>(this.url)
      .pipe(tap((response: ApiResponse<Planet[]>) => {this.infos.set(response.info); }));
  }

  getPlanetsFromService(page: number = 1): Observable<ApiResponse<Planet[]>> {
    return this.http
      .get<ApiResponse<Planet[]>>(this.url, {
        params: { page: page },
      })
      .pipe(tap((response: ApiResponse<Planet[]>) => this.planets.set(response.results)));
  }

  getPlanetFromComponent(page: number = 1): Observable<ApiResponse<Planet[]>> {
    return this.http.get<ApiResponse<Planet[]>>(this.url, {
      params: { page: page },
    });
  }
  
}
  
