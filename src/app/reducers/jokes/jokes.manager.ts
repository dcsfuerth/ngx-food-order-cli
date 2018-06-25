import { State } from '..';
import { schema } from 'normalizr';
import { IJoke, Joke } from './joke.class';
import {
  INormalizedCollectionState,
  generateNormalizedCollectionState,
  readOnlyCollectionManagerFactory,
} from '@dcs/ngx-tools';

export interface IJokesState extends INormalizedCollectionState {
  entities: { jokes: { [key: string]: IJoke } };
}

const initialState = generateNormalizedCollectionState<IJokesState>({ jokes: {} });

const jokeSchema = new schema.Entity(
  'jokes',
  {},
  {
    idAttribute(entity) {
      return String(entity.id);
    },
  }
);

const jokesSchema = new schema.Array(jokeSchema);

export const jokesStateSelector = (state: State): IJokesState => state.jokes;

export const jokesManager = readOnlyCollectionManagerFactory(
  'Jokes',
  initialState,
  jokesStateSelector,
  jokesSchema,
  Joke
);
