import { Component, OnInit } from '@angular/core';
import {PokeapiService} from '../../pokeapi.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  nameFilter = '';

  selectedPkm = null;

  get pokemonList() {
    return this.pokeapi.pokeList.filter(pokemon => {
      return pokemon.name.toLowerCase().indexOf(this.nameFilter.toLocaleLowerCase()) !== -1;
    });
  }

  get pkmSprite() {
    // const num = ('000' + this.selectedPkm.number).slice(-3);// adiciona 3 zeros esquerda
    const num = this.selectedPkm.number
    return `//serebii.net/art/th/${num}.png`;
  }

  constructor( private pokeapi: PokeapiService) { }

  ngOnInit() {
    this.pokeapi.listAll();
  }

}
