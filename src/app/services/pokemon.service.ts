import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FavoritesModel, Pokemon, PokemonListResponse } from '../models';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs';
import { addFavorite, removeFavorite } from '../store/actions/favorite.action';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(
    private store: Store<FavoritesModel>,
    private http: HttpClient
  ) { }

  getAllPokemons(limit: number = 20, offset: number = 0) {
    return this.http.get<PokemonListResponse>(environment.apiURL + `/pokemon?limit=${limit}&offset=${offset}`, {observe: 'response'});
  }

  getPokemonByName(name: string) {
    return this.http.get(environment.apiURL + `/pokemon/${name}`, {observe: 'response'});
  }

  getPokemonById(id: number) {
    return this.http.get(environment.apiURL + `/pokemon/${id}`, {observe: 'response'});
  }

  setFavorite(pokemon: Pokemon) {
    this.store.pipe(select('favorites')).pipe(take(1)).subscribe(result => {
      if(result.filter(item => item.id == pokemon.id).length > 0) {
        this.store.dispatch(removeFavorite({favoriteId: pokemon.id}));
      } else {
        this.getPokemonById(pokemon.id).pipe(take(1)).subscribe((result: any) => {
          this.store.dispatch(addFavorite({favoritePokemon: result.body}));
        });
      }
    });
  }
}
