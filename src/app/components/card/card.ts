import { Component, inject, input } from '@angular/core';
import { IShow } from '../../services/tv-maze-service';
import { RouterLink } from '@angular/router';
import { FavoritesService } from '../../services/favorites-service';

@Component({
  imports: [RouterLink],
  selector: 'app-card',
  styleUrl: './card.css',
  templateUrl: './card.html',
})
export class Card {
  private _favoritesService = inject(FavoritesService);

  show = input.required<IShow>();

  toggleFavorite(): void {
    this._favoritesService.toggleFavorite(this.show());
  }

  isFavorite(): boolean {
    return this._favoritesService.isFavorite(this.show().id);
  }

}
