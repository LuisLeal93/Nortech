import { TestBed, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';

describe('Auth.GuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard]
    });
  });

  it('should be created', inject([AuthGuard], (service: AuthGuard) => {
    expect(service).toBeTruthy();
  }));
});
