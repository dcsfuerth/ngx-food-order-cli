import { createSelector, MemoizedSelector } from '@ngrx/store';
import { denormalize, Schema } from 'normalizr';
import { INormalizedCollectionState } from './interfaces';
import { ISelector } from './normalized-entity.selectors';
import { ViewModel } from './view-model.class';

import {
  Constructor,
  ISubStateSelector,
  subStateKeySelectorFactory,
} from './normalized-entity.selectors';

export interface INormalizedCollectionSelector<R, T> {
  subState: ISubStateSelector<any, INormalizedCollectionState>;
  loading: ISelector<any, boolean>;
  loaded: ISelector<any, boolean>;
  updating: ISelector<any, boolean>;
  error: ISelector<any, any>;
  updatedAt: ISelector<any, Date>;
  rawCollection: ISelector<any, R[]>;
  collection: ISelector<any, T[]>;
}

export function rawCollectionSelectorFactory<S, E>(
  subStateSelector: ISubStateSelector<S, INormalizedCollectionState>,
  schema: Schema
): MemoizedSelector<S, E[]> {
  return createSelector(
    [subStateSelector],
    subState => denormalize(subState.result, schema, subState.entities) as E[]
  );
}

export function collectionSelectorFactory<S, T>(
  rawSelector: any,
  entityConstructor: Constructor<T>
): MemoizedSelector<S, T[]> {
  return createSelector([rawSelector], (rawEntities: any[]) =>
    rawEntities.map((rawEntity: any) => new entityConstructor(rawEntity) as T)
  );
}

export function normalizedCollectionSelectorFactory<
  S extends INormalizedCollectionState,
  R extends object,
  T extends ViewModel<R>
>(
  subStateSelector: ISubStateSelector<any, S>,
  schema: Schema,
  entityConstructor: Constructor<T>
): INormalizedCollectionSelector<R, T> {
  const rawSelector = rawCollectionSelectorFactory<S, R>(subStateSelector, schema);
  return {
    subState: subStateSelector,
    loading: subStateKeySelectorFactory<any, boolean, INormalizedCollectionState>(
      subStateSelector,
      'loading'
    ),
    loaded: subStateKeySelectorFactory<any, boolean, INormalizedCollectionState>(
      subStateSelector,
      'loaded'
    ),
    updating: subStateKeySelectorFactory<any, boolean, INormalizedCollectionState>(
      subStateSelector,
      'updating'
    ),
    error: subStateKeySelectorFactory<any, any, INormalizedCollectionState>(
      subStateSelector,
      'error'
    ),
    updatedAt: subStateKeySelectorFactory<any, Date, INormalizedCollectionState>(
      subStateSelector,
      'updatedAt'
    ),
    rawCollection: rawSelector,
    collection: collectionSelectorFactory<any, T>(rawSelector, entityConstructor),
  };
}
