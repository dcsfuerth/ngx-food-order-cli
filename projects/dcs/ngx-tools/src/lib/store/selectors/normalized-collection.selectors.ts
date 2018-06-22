import { createSelector, MemoizedSelector } from '@ngrx/store';
import { denormalize, Schema } from 'normalizr';
import { INormalizedCollectionState } from './interfaces';
import { ISelector } from './normalized-entity.selectors';

import {
  Constructor,
  ISubStateSelector,
  subStateKeySelectorFactory,
} from './normalized-entity.selectors';

export interface INormalizedCollectionSelector<S, R, T> {
  subState: ISubStateSelector<S, INormalizedCollectionState>;
  loading: ISelector<S, boolean>;
  loaded: ISelector<S, boolean>;
  updating: ISelector<S, boolean>;
  error: ISelector<S, any>;
  updatedAt: ISelector<S, Date>;
  rawCollection: ISelector<S, R[]>;
  collection: ISelector<S, T[]>;
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

export function normalizedCollectionSelectorFactory<S, R, T>(
  subStateSelector: ISubStateSelector<S, INormalizedCollectionState>,
  schema: Schema,
  entityConstructor: Constructor<T>
): INormalizedCollectionSelector<S, R, T> {
  const rawSelector = rawCollectionSelectorFactory<S, R>(subStateSelector, schema);
  return {
    subState: subStateSelector,
    loading: subStateKeySelectorFactory<S, boolean, INormalizedCollectionState>(
      subStateSelector,
      'loading'
    ),
    loaded: subStateKeySelectorFactory<S, boolean, INormalizedCollectionState>(
      subStateSelector,
      'loaded'
    ),
    updating: subStateKeySelectorFactory<S, boolean, INormalizedCollectionState>(
      subStateSelector,
      'updating'
    ),
    error: subStateKeySelectorFactory<S, any, INormalizedCollectionState>(
      subStateSelector,
      'error'
    ),
    updatedAt: subStateKeySelectorFactory<S, Date, INormalizedCollectionState>(
      subStateSelector,
      'updatedAt'
    ),
    rawCollection: rawSelector,
    collection: collectionSelectorFactory<S, T>(rawSelector, entityConstructor),
  };
}
