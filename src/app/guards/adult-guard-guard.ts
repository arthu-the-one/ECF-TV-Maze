import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TvMazeService } from '../services/tv-maze-service';
import { AccessService } from '../services/access-service';

export const adultGuardGuard: CanActivateFn = (route, state) => {
  const accessService = inject(AccessService);
  const router = inject(Router);

  if (accessService.adultAccess()) {
    return true;
  }

  return router.createUrlTree(['/tv-maze/home']);
};
