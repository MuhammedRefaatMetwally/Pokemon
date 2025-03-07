import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemoncardComponent } from '../../pokemoncard/pokemoncard.component';

interface Pokemon {
  name: string;
  imageUrl: string;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule,PokemoncardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  pokemonList: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>('https://pokeapi.co/api/v2/pokemon?limit=60')
      .subscribe(response => {
        this.pokemonList = response.results;
      });
  }
}
