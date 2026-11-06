import { Service, signal } from '@angular/core';

@Service()
export class AccessService {
    adultAccess = signal(false);

    toggleAdultAccess() {
        this.adultAccess.update(value => !value);
    }
}
