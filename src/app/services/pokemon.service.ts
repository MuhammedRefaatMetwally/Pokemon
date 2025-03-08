import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
  private speciesUrl = 'https://pokeapi.co/api/v2/pokemon-species/';
  private tcgApiUrl =
    'https://api.pokemontcg.io/v2/cards?page=1&pageSize=5&q=name:';

  constructor(private http: HttpClient) {}
  private apiKey = '904acd36-83b0-43ec-9d55-6a44b0fb5fb8';
  // getPokemonById(id: number): Observable<any> {
  //   return this.http.get(`${this.apiUrl}${id}`);
  // }
  getPokemonById(id: number) {
    //it doesnt work if i need to return two requests in an object?
    const species = this.http.get(`${this.speciesUrl}${id}`);
    const pokeData = this.http.get(`${this.apiUrl}${id}`);
    return forkJoin({ pokemon: pokeData, species: species });
  }
  getPokemonCardsByName(name: string) {
    const headers = new HttpHeaders({
      'x-api-key': this.apiKey, // Add the API key to the headers
    });
    return this.http.get(`${this.tcgApiUrl}${name}`, { headers });
  }
}
