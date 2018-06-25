import { ActionReducer } from '@ngrx/store';
import { Schema } from 'normalizr';
import { asyncFetchReducerFactory } from '../reducers/normalized-collection.reducers';
import { INormalizedCollectionState } from '../selectors/interfaces';
import { Constructor, ISubStateSelector } from '../selectors/normalized-entity.selectors';
import { generateAsyncActionNames, IAsyncActionNames } from '../utils/actions';
import {
  INormalizedCollectionSelector,
  normalizedCollectionSelectorFactory,
} from '../selectors/normalized-collection.selectors';

export interface IReadOnlyCollectionManager<S, R, T> {
  actions: { fetch: IAsyncActionNames };
  initialState: S;
  reducer: ActionReducer<S>;
  selectors: INormalizedCollectionSelector<S, R, T>;
  schema: Schema;
  entityConstructor: Constructor<T>;
}

export function readOnlyCollectionManagerFactory<S extends INormalizedCollectionState, R, T>(
  baseName: string,
  initialState: S,
  subStateSelector: ISubStateSelector<any, S>,
  schema: Schema,
  entityConstructor: Constructor<T>
): IReadOnlyCollectionManager<S, R, T> {
  const actions = {
    fetch: generateAsyncActionNames(`[${baseName}] Fetch`),
  };

  const selectors = normalizedCollectionSelectorFactory<S, R, T>(
    subStateSelector,
    schema,
    entityConstructor
  );
  const reducer = asyncFetchReducerFactory(initialState, actions.fetch);

  return { actions, entityConstructor, initialState, reducer, selectors, schema };
}
