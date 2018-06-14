import { TestBed, inject } from '@angular/core/testing';

import { NotesResolveService } from './notes-resolve.service';

describe('NotesResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotesResolveService]
    });
  });

  it('should be created', inject([NotesResolveService], (service: NotesResolveService) => {
    expect(service).toBeTruthy();
  }));
});
