import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FavoritesModel, Pokemon } from 'src/app/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  favorites$: Observable<Pokemon[]>;
  navbarOpen = false;

  constructor(
    private store: Store<FavoritesModel>,
    private router: Router
  ) {
    this.favorites$ = this.store.pipe(select('favorites'));
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationStart) {
        this.navbarOpen = false;
      }
    });
  
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen
  }
}
