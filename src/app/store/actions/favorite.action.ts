import { createAction, props } from '@ngrx/store';
import { Pokemon } from 'src/app/models';

export const addFavorite = createAction(
  '[Favorite List] Add Favorite',
  props<{ favoritePokemon: Pokemon }>()
);

export const removeFavorite = createAction(
  '[Favorite Collection] Remove Favorite',
  props<{ favoriteId: number }>()
);

export const retrievedFavoriteList = createAction(
  '[Favorite List/API] Retrieve Favorites Success',
  props<{ Favorites: ReadonlyArray<Pokemon> }>()
);