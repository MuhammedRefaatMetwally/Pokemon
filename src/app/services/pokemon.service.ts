import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
  private speciesUrl = 'https://pokeapi.co/api/v2/pokemon-species/';

  constructor(private http: HttpClient) {}

  // getPokemonById(id: number): Observable<any> {
  //   return this.http.get(`${this.apiUrl}${id}`);
  // }
  getPokemonById(id: number) {
    //it doesnt work if i need to return two requests in an object?
    const species = this.http.get(`${this.speciesUrl}${id}`);
    const pokeData = this.http.get(`${this.apiUrl}${id}`);
    return forkJoin({ pokemon: pokeData, species: species });
  }
}
