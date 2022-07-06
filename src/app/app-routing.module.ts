import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { PokedexComponent } from './pages/pokedex/pokedex.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'pokedex'},
  {path: 'pokedex', component: PokedexComponent},
  {path: 'favorites', component: FavoritesComponent},
  {path: '**', redirectTo: 'pokedex'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
