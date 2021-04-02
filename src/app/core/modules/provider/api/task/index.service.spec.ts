/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApiIndexService } from './index.service';

describe('Service: Index', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiIndexService]
    });
  });

  it('should ...', inject([ApiIndexService], (service: ApiIndexService) => {
    expect(service).toBeTruthy();
  }));
});
