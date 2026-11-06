import { Component, inject } from '@angular/core';
import { Card } from '../../components/card/card';
import { FavoritesService } from '../../services/favorites-service';

@Component({
  imports: [Card],
  selector: 'app-favorites',
  styleUrl: './favorites.css',
  templateUrl: './favorites.html',
})
export class Favorites {
  favoritesService = inject(FavoritesService)
}
