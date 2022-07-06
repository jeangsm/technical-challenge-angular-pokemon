import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FavoritesModel, Pokemon } from 'src/app/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  favorites$: Observable<Pokemon[]>;
  constructor(
    private store: Store<FavoritesModel>,
  ) {
    this.favorites$ = this.store.pipe(select('favorites'));
  }
}
