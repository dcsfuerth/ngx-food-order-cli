import { IAction } from '../../selectors';
import { IAsyncActionNames } from '../../utils';

export type ISimpleEntityState<T extends object> = Readonly<{
  loading: boolean;
  loaded: boolean;
  updatedAt: Date;
  error: any;
  entity: T;
}>;

export function createSimpleEntityState<T extends object>(): ISimpleEntityState<T> {
  return Object.freeze({
    loading: false,
    loaded: false,
    updatedAt: null,
    error: null,
    entity: null,
  });
}

export function createSimpleEntityReducer<T extends object>(actions: IAsyncActionNames) {
  const initialState = createSimpleEntityState<T>();

  return (state: ISimpleEntityState<T> = initialState, action: IAction): ISimpleEntityState<T> => {
    switch (action.type) {
      case actions.start:
        return { ...state, loading: true, loaded: false };

      case actions.success:
        return {
          ...state,
          loading: false,
          loaded: true,
          entity: action.payload,
          updatedAt: new Date(),
        };

      case actions.error:
        return { ...initialState, error: action.payload };

      case actions.reset:
        return initialState;
    }

    return state;
  };
}
