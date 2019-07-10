import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

interface PokeListResponse {
    created: string;
    modified: string;
    name: string;
    pokemon: any[];
    resource_uri: string;
}

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

    private url = '//dev.treinaweb.com.br/pokeapi/';
    pokeList = [];

    constructor(private http: HttpClient) { }

    listAll() {
        this.http.get<PokeListResponse>(`${this.url}/pokedex/1`)
            .subscribe(
                response => {
                    // vamos extrair o numero do pokemon que vem na  usando a fun;'ao getNumberFromUrl
                    response.pokemon.forEach(pokemon => {
                        pokemon.number = this.getNumberFromUri(pokemon.resource_uri);
                    });

                    // vamos ordenar corretamente, pois os dados vêm desordenados
                    // e depois usar o filter para pegar somente pokemons menor que 1000
                    this.pokeList = this.sortPokemon(response.pokemon)
                        .filter(pokemon => pokemon.number < 200);

                }
            );
    }

    private getNumberFromUri(url) {
        return parseInt(url.replace(/.*\/(\d+)\/$/, '$1'));
    }

    private sortPokemon(pokemonList) {
        return pokemonList.sort((a, b) => {
            return (a.number > b.number ? 1 : -1);
        });
    }
}
