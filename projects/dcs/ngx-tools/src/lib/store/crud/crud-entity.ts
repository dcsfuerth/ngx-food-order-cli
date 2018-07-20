import { ActionReducer } from '@ngrx/store';
import { Schema } from 'normalizr';
import { normalizedEntityReducerFactory } from '../reducers/normalized-entity.reducers';
import { INormalizedEntityState } from '../selectors/interfaces';
import { ViewModel } from '../selectors/view-model.class';
import { generateCrudActionNames, ICrudActionNames } from '../utils/actions';
import {
  ISubStateSelector,
  Constructor,
  normalizedEntitySelectorFactory,
  INormalizedEntitySelector,
} from '../selectors/normalized-entity.selectors';

export interface ICrudEntityManager<S, R, T> {
  actions: ICrudActionNames;
  initialState: S;
  reducer: ActionReducer<S>;
  selectors: INormalizedEntitySelector<R, T>;
  schema: Schema;
  entityConstructor: Constructor<T>;
}

export function crudEntityManagerFactory<
  S extends INormalizedEntityState,
  R extends object,
  T extends ViewModel<R>
>(
  baseName: string,
  initialState: S,
  subStateSelector: ISubStateSelector<any, S>,
  schema: Schema,
  entityConstructor: Constructor<T>
): ICrudEntityManager<S, R, T> {
  const actions = generateCrudActionNames(baseName);

  const selectors = normalizedEntitySelectorFactory<S, R, T>(
    subStateSelector,
    schema,
    entityConstructor
  );
  const reducer = normalizedEntityReducerFactory(
    initialState,
    actions.fetch,
    actions.create,
    actions.update,
    actions.delete
  );

  return { actions, entityConstructor, initialState, reducer, selectors, schema };
}
