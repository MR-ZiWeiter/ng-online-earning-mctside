/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WorkIndexedDBService } from './work-indexedDB.service';

describe('Service: WorkIndexedDB', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkIndexedDBService]
    });
  });

  it('should ...', inject([WorkIndexedDBService], (service: WorkIndexedDBService) => {
    expect(service).toBeTruthy();
  }));
});
