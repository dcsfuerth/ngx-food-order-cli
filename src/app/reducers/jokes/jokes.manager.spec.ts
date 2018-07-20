import { Joke } from './joke.class';
import { jokesManager } from './jokes.manager';

describe('Jokes Manager', () => {
  describe('initialState', () => {
    it('has the correct format', () => {
      expect(jokesManager.initialState).toMatchSnapshot();
    });
  });

  describe('reducer', () => {
    it('returns the initialState', () => {
      const newState = jokesManager.reducer(undefined, { type: 'any' });
      expect(newState).toMatchSnapshot();
      expect(newState).toEqual(jokesManager.initialState);
    });

    it('sets loading to true on start action', () => {
      const newState = jokesManager.reducer(undefined, { type: jokesManager.actions.fetch.start });
      expect(newState).toMatchSnapshot();
    });
  });

  describe('selectors', () => {
    const state = {
      jokes: {
        ...jokesManager.initialState,
        loaded: true,
        result: ['42'],
        entities: { jokes: { 42: { id: '42', joke: 'Knock, knock!', categories: ['bad jokes'] } } },
      },
    };

    describe('collection', () => {
      it('returns a collection of Joke instances', () => {
        const collection = jokesManager.selectors.collection(state);
        expect(collection[0]).toEqual(expect.any(Joke));
        expect(collection).toMatchSnapshot();
      });
    });

    describe('loaded', () => {
      it('returns true', () => {
        expect(jokesManager.selectors.loaded(state)).toEqual(true);
      });
    });

    describe('loading', () => {
      it('returns false', () => {
        expect(jokesManager.selectors.loading(state)).toEqual(false);
      });
    });
  });
});
