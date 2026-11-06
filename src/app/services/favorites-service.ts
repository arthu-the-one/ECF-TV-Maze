import { Service, signal } from '@angular/core';
import { IShow } from './tv-maze-service';

@Service()
export class FavoritesService {
    private _storageKey = 'tv-maze-favorites';

    favorites = signal<IShow[]>(this._loadFavorites());

    private _loadFavorites(): IShow[] {
        if (typeof localStorage === 'undefined') {
            return [];
        } try {
            const saved = localStorage.getItem(this._storageKey);
            return saved ? JSON.parse(saved) as IShow[] : [];
        } catch {
            return [];
        }
    }

    private _saveFavorites(): void {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(
                this._storageKey,
                JSON.stringify(this.favorites())
            );
        }
    }

    addFavorite(show: IShow): void {
        this.favorites.update(favorites => {
            if (favorites.some(favorite => favorite.id === show.id)) {
                return favorites;
            }
            return [...favorites, show];
        });
        this._saveFavorites();
    }

    removeFavorite(id: number): void {
        this.favorites.update(favorites =>
            favorites.filter(show => show.id !== id)
        );
        this._saveFavorites();
    }

    isFavorite(id: number): boolean {
        return this.favorites().some(show => show.id === id);
    }

    toggleFavorite(show: IShow): void {
        if (this.isFavorite(show.id)) {
            this.removeFavorite(show.id);
        } else {
            this.addFavorite(show);
        }
    }
}
