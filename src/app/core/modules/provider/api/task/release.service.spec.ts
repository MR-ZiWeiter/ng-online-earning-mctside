/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApiReleaseService } from './release.service';

describe('Service: Release', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiReleaseService]
    });
  });

  it('should ...', inject([ApiReleaseService], (service: ApiReleaseService) => {
    expect(service).toBeTruthy();
  }));
});
