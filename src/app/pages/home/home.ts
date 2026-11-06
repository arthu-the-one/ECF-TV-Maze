import { Component, inject, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { IShow, TvMazeService } from '../../services/tv-maze-service';
import { Card } from '../../components/card/card';

@Component({
  imports: [FormField, Card],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  private _tvMazeService = inject(TvMazeService);

  model = signal({
    search: ''
  });

  form = form(this.model, path => {
    required(path.search);
  });

  shows = signal<IShow[]>([]);

  loading = signal(false);
  errorMessage = signal('');
  hasSearched = signal(false);

  onSubmit(event: Event) {
    event.preventDefault();

    const query = this.model().search.trim();

    if (!query) {
      this.shows.set([]);
      return;
    }

    this.hasSearched.set(true);
    this.loading.set(true);
    this.errorMessage.set('');

    this._tvMazeService.searchShows(query).subscribe({

      next: (results) => {
        this.shows.set(results.map(result => result.show));
        this.loading.set(false);
      },

      error: (error) => {
        console.error(error);
        this.errorMessage.set('Impossible de récupérer les séries.');
        this.loading.set(false);
      }

    });
  }
}
