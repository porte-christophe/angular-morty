import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Episode } from '../types/episode.type';
import { ApiResponse, InfoResponse } from '../../../shared/types/api-response.types';

@Injectable({
  providedIn: 'root',
})
export class EpisodesService {
  private readonly http = inject(HttpClient);
  private episodes = signal<Episode[]>([]);
  private infos = signal<InfoResponse>({} as InfoResponse);
  readonly episodeSignal = this.episodes.asReadonly();
  readonly url = 'https://rickandmortyapi.com/api/episode/';

  getInfos(){
    return this.infos;
  }
  getInfosFromService(): Observable<ApiResponse<Episode[]>> {
    return this.http
      .get<ApiResponse<Episode[]>>(this.url)
      .pipe(tap((response: ApiResponse<Episode[]>) => {this.infos.set(response.info); }));
  }

  getEpisodesFromService(page: number = 1): Observable<ApiResponse<Episode[]>> {
    return this.http
      .get<ApiResponse<Episode[]>>(this.url, {
        params: { page: page },
      })
      .pipe(tap((response: ApiResponse<Episode[]>) => this.episodes.set(response.results)));
  }

  getEpisodeFromComponent(page: number = 1): Observable<ApiResponse<Episode[]>> {
    return this.http.get<ApiResponse<Episode[]>>(this.url, {
      params: { page: page },
    });
  }
}


