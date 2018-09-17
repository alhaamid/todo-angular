import { TestBed, inject } from '@angular/core/testing';

import { TestingBackendService } from './testing-backend.service';

describe('TestingBackendService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestingBackendService]
    });
  });

  it('should be created', inject([TestingBackendService], (service: TestingBackendService) => {
    expect(service).toBeTruthy();
  }));
});
