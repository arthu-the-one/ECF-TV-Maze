import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IShow, TvMazeService } from '../../services/tv-maze-service';

@Component({
  imports: [RouterLink],
  selector: 'app-details',
  styleUrl: './details.css',
  templateUrl: './details.html',
})
export class Details implements OnInit {
  private _route = inject(ActivatedRoute);
  private _tvMazeService = inject(TvMazeService);

  show = signal<IShow | null>(null);
  loading = signal(true);
  errorMessage = signal('');

  ngOnInit() {
    const id = Number(this._route.snapshot.paramMap.get('id'));

    this._tvMazeService.getShowDetails(id).subscribe({
      next: (result) => {
        this.show.set(result);
        this.loading.set(false);
      },
      error: (error) => {
        console.error(error);
        this.errorMessage.set('Impossible de récupérer les informations de cette série.');
        this.loading.set(false);
      }
    });
  }
}
