import { TestBed } from '@angular/core/testing';

import { SoliasComponentsService } from './solias-components.service';

describe('SoliasComponentsService', () => {
  let service: SoliasComponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoliasComponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
