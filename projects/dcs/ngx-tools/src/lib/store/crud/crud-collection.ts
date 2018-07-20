import { ActionReducer } from '@ngrx/store';
import { Schema } from 'normalizr';
import { normalizedCollectionReducerFactory } from '../reducers/normalized-collection.reducers';
import { INormalizedCollectionState } from '../selectors/interfaces';
import { Constructor, ISubStateSelector } from '../selectors/normalized-entity.selectors';
import { ViewModel } from '../selectors/view-model.class';
import { generateAsyncActionNames, ICrudActionNames } from '../utils/actions';
import {
  INormalizedCollectionSelector,
  normalizedCollectionSelectorFactory,
} from '../selectors/normalized-collection.selectors';

export interface ICrudCollectionManager<S, R, T> {
  actions: ICrudActionNames;
  initialState: S;
  reducer: ActionReducer<S>;
  selectors: INormalizedCollectionSelector<R, T>;
  schema: Schema;
  entityConstructor: Constructor<T>;
}

export function crudCollectionManagerFactory<
  S extends INormalizedCollectionState,
  R extends object,
  T extends ViewModel<R>
>(
  baseName: string,
  key: string,
  initialState: S,
  entityActions: ICrudActionNames,
  subStateSelector: ISubStateSelector<any, S>,
  schema: Schema,
  entityConstructor: Constructor<T>
): ICrudCollectionManager<S, R, T> {
  const fetchActions = generateAsyncActionNames(`[${baseName}] Fetch`);
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
