import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DataService, DataServiceProtocols } from './data.service';

describe('DataService', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [ DataService ], imports: [HttpClientTestingModule] }));

  it('should be a string that contains https', () => {
    const service: DataService = TestBed.inject(DataService);
    const url = service.getUrlWithProtocol('https://localhost', DataServiceProtocols.NONE);
    expect(url).toContain('https');
  });


  it('should be a string that contains http', () => {
    const service: DataService = TestBed.inject(DataService);
    const url = service.getUrlWithProtocol('http://localhost', DataServiceProtocols.NONE);
    expect(url).toContain('http');
  });

  it('should be a string that is equal to the original url', () => {
    const service: DataService = TestBed.inject(DataService);
    const url = service.getUrlWithProtocol('localhost', DataServiceProtocols.NONE);
    expect(url).toBe('localhost');
  });

  it('should be a string that contains https', () => {
    const service: DataService = TestBed.inject(DataService);
    const url = service.getUrlWithProtocol('localhost', DataServiceProtocols.HTTPS);
    expect(url).toBe('https://localhost');
  });

  it('should be a string that contains http', () => {
    const service: DataService = TestBed.inject(DataService);
    const url = service.getUrlWithProtocol('localhost', DataServiceProtocols.HTTP);
    expect(url).toBe('http://localhost');
  });

});
