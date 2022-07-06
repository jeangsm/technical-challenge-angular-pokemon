import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from 'src/app/models';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent {
  @Input() pokemon: Pokemon;
  @Input() favorite: boolean = false;
  @Input() removeOption: boolean = false;
  @Output() removeFavorite = new EventEmitter<number>();

  constructor(
    private pokemonService: PokemonService
  ) { }

  onRemoveFavorite(pokemon: Pokemon) {
    this.pokemonService.setFavorite(pokemon);
  }  
}
