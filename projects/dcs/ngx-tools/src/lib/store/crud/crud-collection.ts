import { ActionReducer } from '@ngrx/store';
import { Schema } from 'normalizr';
import { normalizedCollectionReducerFactory } from '../reducers/normalized-collection.reducers';
import { normalizedEntityReducerFactory } from '../reducers/normalized-entity.reducers';
import { INormalizedCollectionState, INormalizedEntityState } from '../selectors/interfaces';
import {
  generateCrudActionNames,
  ICrudActionNames,
  generateAsyncActionNames,
} from '../utils/actions';
import {
  INormalizedCollectionSelector,
  normalizedCollectionSelectorFactory,
} from '../selectors/normalized-collection.selectors';
import {
  ISubStateSelector,
  Constructor,
  normalizedEntitySelectorFactory,
  INormalizedEntitySelector,
} from '../selectors/normalized-entity.selectors';

export interface ICrudCollectionManager<S, R, T> {
  actions: ICrudActionNames;
  initialState: S;
  reducer: ActionReducer<S>;
  selectors: INormalizedCollectionSelector<S, R, T>;
  schema: Schema;
  entityConstructor: Constructor<T>;
}

export function crudCollectionManagerFactory<S extends INormalizedCollectionState, R, T>(
  baseName: string,
  key: string,
  initialState: S,
  entityActions: ICrudActionNames,
  subStateSelector: ISubStateSelector<any, S>,
  schema: Schema,
  entityConstructor: Constructor<T>
): ICrudCollectionManager<S, R, T> {
  const fetchActions = generateAsyncActionNames(baseName);
  const actions = {
    ...entityActions,
    fetch: fetchActions,
  };

  const selectors = normalizedCollectionSelectorFactory<S, R, T>(
    subStateSelector,
    schema,
    entityConstructor
  );
  const reducer = normalizedCollectionReducerFactory(
    key,
    initialState,
    fetchActions,
    entityActions.create,
    entityActions.update,
    entityActions.delete
  );

  return { actions, entityConstructor, initialState, reducer, selectors, schema };
}
