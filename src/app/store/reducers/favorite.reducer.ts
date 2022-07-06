import { createReducer, on } from '@ngrx/store';
import { Pokemon } from 'src/app/models';
import { addFavorite, removeFavorite } from '../actions/favorite.action';

// export const favorites = new FavoritesModel();


export const initialState: ReadonlyArray<Pokemon> = [];
 
export const favoritesReducer = createReducer(
  initialState,
  on(removeFavorite, (state, { favoriteId }) => state.filter((pokemon) => pokemon.id !== favoriteId)),
  on(addFavorite, (state, { favoritePokemon }) => {
    return [...state, favoritePokemon];
  })
);

// export const favoritesReducer = createReducer(
//   initialState,
//   on(removeFavorite, (state, { favoriteId }) => state.filter((id) => id !== favoriteId)),
//   on(addFavorite, (state, { favoriteId }) => {
//     if (state.indexOf(favoriteId) > -1) return state;
 
//     return [...state, favoriteId];
//   })
// );

// export function favoritesReducer(state = favorites, action: ActionModel) {
//     switch (action.type) {
//         case ActionTypes.Add:
//             {
//                 state.favorites.push(action.payload);

//                 console.log(state);
//                 return state;
//             };

//         case ActionTypes.Remove:
//             {
//                 const index = state.favorites.indexOf(action.payload);
//                 state.favorites.splice(index, 1);

//                 console.log(state);
//                 return state;
//             };

//         case ActionTypes.Clear:
//             {
//                 state = new FavoritesModel();

//                 console.log(state);
//                 return state;
//             }

//         default:
//             return state;
//     }
// }