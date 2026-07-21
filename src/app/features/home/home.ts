import { Component, inject, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CharactersService } from '../characters/services/characters';
import { PlanetsService } from '../planets/services/planets';
import { EpisodesService } from '../episodes/services/episodes';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private readonly charactersService = inject(CharactersService);
  readonly infosPerso = this.charactersService.getInfos();

  private readonly planetsService = inject(PlanetsService);
  readonly infosPlanets = this.planetsService.getInfos();

  private readonly episodesService = inject(EpisodesService);
  readonly infosEpisodes = this.episodesService.getInfos();
  ngOnInit(){
    this.charactersService.getInfosFromService().subscribe();
    this.planetsService.getInfosFromService().subscribe();
    this.episodesService.getInfosFromService().subscribe();
  }
}