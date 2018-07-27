import { createSelector } from '@ngrx/store';
import { Constructor } from '../../selectors/normalized-entity.selectors';
import { ViewModel } from '../../selectors/view-model.class';

export interface ISimpleStateSelectors<S, T extends object, M extends ViewModel<T>> {
  loading: (state: S) => boolean;
  loaded: (state: S) => boolean;
  error: (state: S) => any;
  updatedAt: (state: S) => Date;
  rawEntity: (state: S) => T;
  entity: (state: S) => M;
}

export function simpleStateSelectorsFactory<S, T extends object, M extends ViewModel<T>>(
  subStateSelector: (state: S) => any,
  konstructor: Constructor<M>
): ISimpleStateSelectors<S, T, M> {
  const rawSelector = (state: S) => subStateSelector(state).entity;

  return {
    loading: (state: S) => subStateSelector(state).loading,
    loaded: (state: S) => subStateSelector(state).loaded,
    error: (state: S) => subStateSelector(state).error,
    updatedAt: (state: S) => subStateSelector(state).updatedAt,
    rawEntity: rawSelector,
    entity: createSelector([rawSelector], rawEntity => new (konstructor as any)(rawEntity)),
  };
}
