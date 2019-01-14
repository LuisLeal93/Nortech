import { TestBed, async, inject } from '@angular/core/testing';

import { TarjetaGuard } from './tarjeta.guard';

describe('TarjetaGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TarjetaGuard]
    });
  });

  it('should ...', inject([TarjetaGuard], (guard: TarjetaGuard) => {
    expect(guard).toBeTruthy();
  }));
});
