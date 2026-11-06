import { TestBed } from '@angular/core/testing';
import { TvMazeService } from './tv-maze-service';

describe('TvMazeService', () => {
  let service: TvMazeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TvMazeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
