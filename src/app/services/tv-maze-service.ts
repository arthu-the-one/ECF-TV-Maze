import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

interface IShowImage {
    medium: string;
    original: string;
}

interface IEpisode {
    id: number;
    name: string;
    season: number;
    number: number | null;
    airdate: string;
    summary: string | null;
}

export interface IShow {
    id: number;
    name: string;
    status: string;
    summary: string | null;
    genres: string[];
    image: IShowImage | null;
    rating: {
        average: number | null;
    };
    _embedded?: {
        episodes: IEpisode[];
    };
}

interface SearchResult {
    score: number;
    show: IShow;
}

@Service()
export class TvMazeService {
    private _http = inject(HttpClient);
    private _apiUrl = 'https://api.tvmaze.com';

    searchShows(query: string) {
        return this._http.get<SearchResult[]>(
            `${this._apiUrl}/search/shows?q=${encodeURIComponent(query)}`
        );
    }

    getShowDetails(id: number) {
        return this._http.get<IShow>(
            `${this._apiUrl}/shows/${id}?embed=episodes`
        );
    }
}
