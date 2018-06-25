import { ActionReducer } from '@ngrx/store';
import { Schema } from 'normalizr';
import { asyncFetchReducerFactory } from '../reducers/normalized-collection.reducers';
import { INormalizedEntityState } from '../selectors/interfaces';
import { generateAsyncActionNames, IAsyncActionNames } from '../utils/actions';
import {
  ISubStateSelector,
  Constructor,
  normalizedEntitySelectorFactory,
  INormalizedEntitySelector,
} from '../selectors/normalized-entity.selectors';

export interface IReadOnlyEntityManager<S, R, T> {
  actions: { fetch: IAsyncActionNames };
  initialState: S;
  reducer: ActionReducer<S>;
  selectors: INormalizedEntitySelector<S, R, T>;
  schema: Schema;
  entityConstructor: Constructor<T>;
}

export function readOnlyEntityManagerFactory<S extends INormalizedEntityState, R, T>(
  baseName: string,
  initialState: S,
  subStateSelector: ISubStateSelector<any, S>,
  schema: Schema,
  entityConstructor: Constructor<T>
): IReadOnlyEntityManager<S, R, T> {
  const actions = {
    fetch: generateAsyncActionNames(`[${baseName}] Fetch`),
  };

  const selectors = normalizedEntitySelectorFactory<S, R, T>(
    subStateSelector,
    schema,
    entityConstructor
  );
  const reducer = asyncFetchReducerFactory(initialState, actions.fetch);

  return { actions, entityConstructor, initialState, reducer, selectors, schema };
}
