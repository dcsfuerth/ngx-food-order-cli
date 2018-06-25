import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { ApiRequestActionTypes, ApiRequestErrorActions } from './api-request.actions';

export interface IApiErrorItem {
  id: string | null;
  error: HttpErrorResponse;
  action: Action;
}

export interface IApiErrorState {
  latest: IApiErrorItem | null;
  errors: IApiErrorItem[];
}

export const initialState: IApiErrorState = {
  latest: null,
  errors: [],
};

export function apiError(
  state: IApiErrorState = initialState,
  action: ApiRequestErrorActions
): IApiErrorState {
  switch (action.type) {
    case ApiRequestActionTypes.ApiError:
      const item = { id: null, ...action.payload };
      return { latest: item, errors: [...state.errors, item] };

    case ApiRequestActionTypes.ApiErrorsReset:
      return initialState;
  }

  return state;
}
