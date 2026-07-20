import { Component, input } from '@angular/core';
import { Planet } from '../../types/planet.type';

@Component({
  selector: 'app-planet-card',
  imports: [],
  templateUrl: './planet-card.html',
  styleUrl: './planet-card.css',
})
export class PlanetCard {
  planet = input.required<Planet>();
}
