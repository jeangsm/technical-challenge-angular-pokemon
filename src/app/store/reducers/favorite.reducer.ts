import { createReducer, on } from '@ngrx/store';
import { Pokemon } from 'src/app/models';
import { addFavorite, removeFavorite } from '../actions/favorite.action';

export const initialState: ReadonlyArray<Pokemon> = [];
 
export const favoritesReducer = createReducer(
  initialState,
  on(removeFavorite, (state, { favoriteId }) => state.filter((pokemon) => pokemon.id !== favoriteId)),
  on(addFavorite, (state, { favoritePokemon }) => {
    return [...state, favoritePokemon];
  })
);