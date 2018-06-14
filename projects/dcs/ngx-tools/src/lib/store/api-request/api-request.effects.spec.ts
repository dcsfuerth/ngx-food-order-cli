import { HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { ApiRequestEffects } from './api-request.effects';
import { APP_ENVIRONMENT } from '../../tokens';

describe('ApiRequestService', () => {
  // tslint:disable-next-line:prefer-const
  let actions$: Observable<any>;
  let effects: ApiRequestEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiRequestEffects,
        provideMockActions(() => actions$),
        { provide: APP_ENVIRONMENT, useValue: { apiUrl: '' } },
      ],
      imports: [HttpClientModule],
    });

    effects = TestBed.get(ApiRequestEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
