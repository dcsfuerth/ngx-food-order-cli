import { Constructor, ViewModel } from '../../selectors';
import { generateAsyncActionNames } from '../../utils/actions';
import {
  simpleEntityStateSelectorsFactory,
  simpleCollectionStateSelectorsFactory,
} from './selectors';
import {
  createSimpleCollectionReducer,
  createSimpleEntityReducer,
  createSimpleEntityState,
  createSimpleCollectionState,
} from './reducers';

export function createSimpleEntityManager<S, T extends object, M extends ViewModel<T>>(
  baseName: string,
  subStateSelector: (state: S) => any,
  konstructor: Constructor<M>
) {
  const actions = generateAsyncActionNames(baseName);
  const initialState = createSimpleEntityState<T>();
  const selectors = simpleEntityStateSelectorsFactory<S, T, M>(subStateSelector, konstructor);
  const reducer = createSimpleEntityReducer<T>(actions, initialState);
  return {
    actions,
    initialState,
    reducer,
    selectors,
  };
}

export function createSimpleCollectionManager<S, T extends object, M extends ViewModel<T>>(
  baseName: string,
  subStateSelector: (state: S) => any,
  konstructor: Constructor<M>
) {
  const actions = generateAsyncActionNames(baseName);
  const initialState = createSimpleCollectionState<T>();
  const selectors = simpleCollectionStateSelectorsFactory<S, T, M>(subStateSelector, konstructor);
  const reducer = createSimpleCollectionReducer<T>(actions, initialState);
  return {
    actions,
    initialState,
    reducer,
    selectors,
  };
}
