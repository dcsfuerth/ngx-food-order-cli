import { createSelector, MemoizedSelector } from '@ngrx/store';
import { denormalize, Schema } from 'normalizr';
import { INormalizedEntityState, INormalizedState } from './interfaces';
import { ViewModel } from './view-model.class';

export type Constructor<T = {}> = new (...args: any[]) => T;

export type ISubStateSelector<S, E extends INormalizedState = INormalizedEntityState> = (
  state: S
) => E;

export type ISelector<S, T> = (state: S) => T;

export interface INormalizedEntitySelector<R, T> {
  subState: ISubStateSelector<any>;
  loading: ISelector<any, boolean>;
  loaded: ISelector<any, boolean>;
  updating: ISelector<any, boolean>;
  error: ISelector<any, any>;
  updatedAt: ISelector<any, Date>;
  rawEntity: ISelector<any, R>;
  entity: ISelector<any, T>;
}

export function subStateKeySelectorFactory<
  S,
  T,
  E extends INormalizedState = INormalizedEntityState
>(subStateSelector: ISubStateSelector<S, E>, key: keyof E): ((state: S) => T) {
  return (state: S) => (subStateSelector(state) as any)[key] as T;
}

export function rawEntitySelectorFactory<S, E>(
  subStateSelector: ISubStateSelector<S>,
  schema: Schema
): MemoizedSelector<S, E> {
  return createSelector([subStateSelector], subState => {
    return denormalize(subState.result, schema, subState.entities) as E;
  });
}

export function entitySelectorFactory<S, T>(
  rawSelector: any,
  entityConstructor: Constructor<T>
): MemoizedSelector<S, T> {
  return createSelector([rawSelector], rawEntity => new entityConstructor(rawEntity) as T);
}

export function normalizedEntitySelectorFactory<
  S extends INormalizedEntityState,
  R extends object,
  T extends ViewModel<R>
>(
  subStateSelector: ISubStateSelector<any, S>,
  schema: Schema,
  entityConstructor: Constructor<T>
): INormalizedEntitySelector<R, T> {
  const rawSelector = rawEntitySelectorFactory<S, R>(subStateSelector, schema);
  return {
    subState: subStateSelector,
    loading: subStateKeySelectorFactory<any, boolean>(subStateSelector, 'loading'),
    loaded: subStateKeySelectorFactory<any, boolean>(subStateSelector, 'loaded'),
    updating: subStateKeySelectorFactory<any, boolean>(subStateSelector, 'updating'),
    error: subStateKeySelectorFactory<any, any>(subStateSelector, 'error'),
    updatedAt: subStateKeySelectorFactory<any, Date>(subStateSelector, 'updatedAt'),
    rawEntity: rawSelector,
    entity: entitySelectorFactory<any, T>(rawSelector, entityConstructor),
  };
}
