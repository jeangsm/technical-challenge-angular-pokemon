import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { FavoritesModel, Pokemon } from 'src/app/models';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit, OnDestroy {
  favorites$: Observable<Pokemon[]>;
  subscription: Subject<void>;
  pokemons: Pokemon[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  loaded = false;
  constructor(
    private store: Store<FavoritesModel>,
    private pokemonService: PokemonService
  ) {
    this.favorites$ = this.store.pipe(select('favorites'));
  }

  ngOnInit(): void {
    this.favorites$.pipe(takeUntil(this.destroy$)).subscribe(result => {
      this.pokemons = [];
      this.loaded = false;
      if(result.length == 0) {
        this.loaded = true;
      }

      // result.forEach(id => {
      //   this.pokemonService.getPokemonById(id).pipe(takeUntil(this.destroy$)).subscribe((response: any) => {
      //     this.pokemons.push(response.body);
      //   this.loaded = true;
      //   });
      // })
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
