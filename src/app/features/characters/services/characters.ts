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
   urlVar:string = "";
  private first = true;
  getInfos(){
    return this.infos;
  }
  getInfosFromService(): Observable<ApiResponse<Character[]>> {
    return this.http
      .get<ApiResponse<Character[]>>(this.url)
      .pipe(tap((response: ApiResponse<Character[]>) => {this.infos.set(response.info); }));
  }
  setUrlResidents(residents: string[]){
    this.first = true;
    this.urlVar="";
    if(residents.length === 0){
      return this.urlVar;
    }
    residents.forEach((resident) =>
    {
      if(this.first){
        this.urlVar += this.url + resident.slice(42);
        this.first = false;
      }else{
        this.urlVar += "," + resident.slice(42);
      }
    })
    return this.urlVar;
  }
  getCharacters(url:string, characters: Character[]): Observable<Character[]> {
    return this.http
    .get<Character[]>(url)
    //.pipe(tap((response: Character[]) => {characters.set(response);console.log(response);}));
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
