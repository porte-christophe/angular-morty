import { Component, OnInit, signal, inject } from '@angular/core';
import { Planet } from '../../types/planet.type';
import { PlanetCard } from '../../components/planet-card/planet-card';
import { PlanetsService } from '../../services/planets';
import { ApiResponse, InfoResponse } from '../../../../shared/types/api-response.types';
import { Pagination } from '../../../../shared/components/pagination/pagination';

@Component({
  selector: 'app-planets',
  imports: [PlanetCard, Pagination],
  templateUrl: './planets.html',
  styleUrl: './planets.css',
})
export class Planets implements OnInit {
  private readonly planetService = inject(PlanetsService);
  readonly planets = this.planetService.planetSignal;
  readonly infos = signal<InfoResponse>({} as InfoResponse);
  currentPage = signal(1);
  totalPage = signal(0);

  ngOnInit() {
    // Method 1 : Do everything in the service
    this.planetService.getPlanetsFromService().subscribe();
    // Method 2 : Get needed value in the component directly
    this.loadPlanets();
  }

  loadPlanets(page?: number) {
    this.currentPage.set(page ? page : 1);

    this.planetService
      .getPlanetFromComponent()
      .subscribe((response: ApiResponse<Planet[]>) => {
        this.infos.set(response.info);
        this.totalPage.set(this.infos().pages);
      });
  }

  changePage(page: number) {
    this.currentPage.set(page);
    this.planetService.getPlanetsFromService(page).subscribe();
  }
}
