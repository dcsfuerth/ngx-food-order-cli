import { createSelector } from '@ngrx/store';
import { ViewModel } from '../..//selectors/view-model.class';
import { Constructor } from '../../selectors/normalized-entity.selectors';

export interface ISimpleEntityStateSelectors<S, T extends object, M extends ViewModel<T>> {
  loading: (state: S) => boolean;
  loaded: (state: S) => boolean;
  error: (state: S) => any;
  updatedAt: (state: S) => Date;
  rawEntity: (state: S) => T;
  entity: (state: S) => M;
}

export interface ISimpleCollectionStateSelectors<S, T extends object, M extends ViewModel<T>> {
  loading: (state: S) => boolean;
  loaded: (state: S) => boolean;
  error: (state: S) => any;
  updatedAt: (state: S) => Date;
  rawCollection: (state: S) => T[];
  collection: (state: S) => M[];
}

export function simpleEntityStateSelectorsFactory<S, T extends object, M extends ViewModel<T>>(
  subStateSelector: (state: S) => any,
  konstructor: Constructor<M>
): ISimpleEntityStateSelectors<S, T, M> {
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

export function simpleCollectionStateSelectorsFactory<S, T extends object, M extends ViewModel<T>>(
  subStateSelector: (state: S) => any,
  konstructor: Constructor<M>
): ISimpleCollectionStateSelectors<S, T, M> {
  const rawSelector = (state: S) => subStateSelector(state).entities;

  return {
    loading: (state: S) => subStateSelector(state).loading,
    loaded: (state: S) => subStateSelector(state).loaded,
    error: (state: S) => subStateSelector(state).error,
    updatedAt: (state: S) => subStateSelector(state).updatedAt,
    rawCollection: rawSelector,
    collection: createSelector([rawSelector], rawEntities => {
      return rawEntities.map((rawEntity: T) => new (konstructor as any)(rawEntity));
    }),
  };
}
