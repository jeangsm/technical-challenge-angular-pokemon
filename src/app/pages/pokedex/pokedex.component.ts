import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { forkJoin, Observable, Subject, take, takeUntil } from 'rxjs';
import { FavoritesModel, NamedAPIResource, Pokemon, PokemonListResponse } from 'src/app/models';
import { PokemonService } from 'src/app/services/pokemon.service';
import { addFavorite, removeFavorite } from 'src/app/store/actions/favorite.action';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {
  title = 'angular-pokemon';
  pokemons: Pokemon[] = [];
  pokemonsNamedList: NamedAPIResource[] = [];
  total = 0;
  favoriteIds: number[] = [];
  favorites$: Observable<Pokemon[]>;
  destroy$: Subject<boolean> = new Subject<boolean>();
  itemsPerPage = 10;
  itemsPerPageOptions = [5, 10, 20, 30, 40, 50];
  currentPage = 1;

  constructor(
    private pokemonService: PokemonService,
    private store: Store<FavoritesModel>
  ) {
    this.favorites$ = this.store.pipe(select('favorites'));
  }

  ngOnInit() {
    this.getPokemonList(1);
    this.favorites$.pipe(takeUntil(this.destroy$)).subscribe(result => {
      this.favoriteIds = [];
      result.forEach(pokemon => {
        this.favoriteIds.push(pokemon.id);
      });
    });
  }

  getPokemonList(page: number) {
    this.currentPage = page;
    const offset = this.currentPage * this.itemsPerPage - this.itemsPerPage;
    this.pokemonService.getAllPokemons(this.itemsPerPage, offset).subscribe({
      next: (result: HttpResponse<PokemonListResponse>) => {
        if (result.body) {
          this.total = result.body.count;
          this.pokemonsNamedList = result.body.results;
          console.log(this.total);
          this.getPokemonDetails();
        }
      }, error: error => {
        console.log(error);
      }
    });
  }

  getPokemonDetails() {
    const requestArray: any = [];
    this.pokemonsNamedList.forEach(pokemon => {
      requestArray.push(this.pokemonService.getPokemonByName(pokemon.name));
      // this.pokemonService.getPokemonByName(pokemon.name).subscribe((result: any) => {
      //   this.pokemons.push(result.body)
      //   // console.log(result.body)
      // })
    });
    forkJoin(requestArray).subscribe((result: any) => {
      this.pokemons = result.map((item: any) => {
        return item.body;
      });
      // this.pokemons.push(result.body)
      console.log(result);
    });
  }
}
