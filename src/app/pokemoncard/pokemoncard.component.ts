import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-card',
  imports: [CommonModule],
  templateUrl: './pokemoncard.component.html',
  styleUrl: './pokemoncard.component.css',
})
export class PokemoncardComponent implements OnInit {
  @Input() pokemon: any;
  pokemonImage: string = '';
  pokemonId: number = 0;
  pokemonTypes: string[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    if (this.pokemon?.url) {
      this.http.get<any>(this.pokemon.url).subscribe((data) => {
        this.pokemonId = data.id;
        this.pokemonImage = data.sprites.front_default;
        this.pokemonTypes = data.types.map((t: any) => t.type.name);
      });
    }
  }

  getTypeClass(type: string) {
    const typeColors: { [key: string]: string } = {
      fire: 'bg-danger text-white',
      water: 'bg-primary text-white',
      grass: 'bg-success text-white',
      electric: 'bg-warning text-dark',
      psychic: 'bg-pink text-white',
      ice: 'bg-info text-white',
      dragon: 'bg-dark text-white',
      normal: 'bg-secondary text-white',
      fighting: 'bg-danger text-white',
      flying: 'bg-info text-white',
      poison: 'bg-purple text-white',
      ground: 'bg-warning text-dark',
      rock: 'bg-brown text-white',
      bug: 'bg-success text-white',
      ghost: 'bg-dark text-white',
      steel: 'bg-secondary text-white',
      dark: 'bg-dark text-white',
      fairy: 'bg-light text-dark',
    };
    return typeColors[type] || 'bg-secondary text-white';
  }

  
  goToDetails(id: number) {
    this.router.navigate(['pokemon', id]);
  }
}
