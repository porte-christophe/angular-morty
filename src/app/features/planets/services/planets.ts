import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Planet } from '../types/planet.type';
import { ApiResponse } from '../../../shared/types/api-response.types';

@Injectable({
  providedIn: 'root',
})
export class PlanetsService {
  private readonly http = inject(HttpClient);
  private planets = signal<Planet[]>([]);
  readonly planetSignal = this.planets.asReadonly();
  readonly url = 'https://rickandmortyapi.com/api/location/';

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
