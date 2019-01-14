import { TestBed, inject } from '@angular/core/testing';

import { CreditoService } from './credito.service';

describe('CreditoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreditoService]
    });
  });

  it('should be created', inject([CreditoService], (service: CreditoService) => {
    expect(service).toBeTruthy();
  }));
});
