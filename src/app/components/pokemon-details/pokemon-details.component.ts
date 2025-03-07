import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule, TitleCasePipe } from '@angular/common';
@Component({
  selector: 'app-pokemon-details',
  imports: [CommonModule, TitleCasePipe],
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.css',
})
export class PokemonDetailsComponent implements OnInit {
  pokemon: any;
  pokemonSprite: string = '';
  pokemonTypes: string[] = [];
  species: any;
  description: string = '';
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

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pokemonService.getPokemonById(+id).subscribe({
        next: (data: any) => {
          this.pokemon = data.pokemon;
          this.species = data.species;
          this.pokemonSprite =
            this.pokemon.sprites.other['official-artwork'].front_default;

          this.pokemonTypes = this.pokemon.types.map((t: any) => t.type.name);
          this.description = this.species['flavor_text_entries'][1][
            'flavor_text'
          ].replace(/[\n\f]/g, ' ');
          console.log(this.species);
        },
      });
    }
  }
}
