/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApiMerchantService } from './merchant.service';

describe('Service: Merchant', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiMerchantService]
    });
  });

  it('should ...', inject([ApiMerchantService], (service: ApiMerchantService) => {
    expect(service).toBeTruthy();
  }));
});
