/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NinjaService } from './ninja.service';

describe('Service: Ninja', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NinjaService]
    });
  });

  it('should ...', inject([NinjaService], (service: NinjaService) => {
    expect(service).toBeTruthy();
  }));
});
