import { Component, input, OnInit, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Planet } from '../../types/planet.type';
import { CharactersService } from '../../../characters/services/characters';
import { Character } from '../../../characters/types/character.type';
import { ApiResponse } from '../../../../shared/types/api-response.types';

@Component({
  selector: 'app-planet-card',
  imports: [],
  templateUrl: './planet-card.html',
  styleUrl: './planet-card.css',
})
export class PlanetCard implements OnInit{
  private readonly http = inject(HttpClient);
  private readonly characterService = inject(CharactersService);
  planet = input.required<Planet>();
  private url:string = "";
  characters: Character[] = [];
  ngOnInit() {


  }
  
  getChar(){
    this.url = this.characterService.setUrlResidents(this.planet().residents);
    if (this.url!="") {
      this.characterService.getCharacters(this.url, this.characters).subscribe((c: Character[]) => {
        if (Array.isArray(c)) {this.characters = c;}else{this.characters = [c];}
      })   
    }
  }

}
