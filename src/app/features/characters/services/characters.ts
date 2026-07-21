import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Character } from '../types/character.type';
import { ApiResponse, InfoResponse } from '../../../shared/types/api-response.types';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private readonly http = inject(HttpClient);
  private characters = signal<Character[]>([]);
  private infos = signal<InfoResponse>({} as InfoResponse);
  readonly characterSignal = this.characters.asReadonly();
  readonly url = 'https://rickandmortyapi.com/api/character/';
  getInfos(){
    return this.infos;
  }
  getInfosFromService(): Observable<ApiResponse<Character[]>> {
    return this.http
      .get<ApiResponse<Character[]>>(this.url)
      .pipe(tap((response: ApiResponse<Character[]>) => {this.infos.set(response.info); }));
  }

  getCharactersFromService(page: number = 1): Observable<ApiResponse<Character[]>> {
    return this.http
      .get<ApiResponse<Character[]>>(this.url, {
        params: { page: page },
      })
      .pipe(tap((response: ApiResponse<Character[]>) => {this.characters.set(response.results); }));
  }

  getCharacterFromComponent(page: number = 1): Observable<ApiResponse<Character[]>> {
    return this.http.get<ApiResponse<Character[]>>(this.url, {
      params: { page: page },
    });
  }
}
