import { Joke } from './joke.class';

describe('Joke', () => {
  describe('constructor', () => {
    let subject: Joke;

    describe('without params', () => {
      beforeEach(() => {
        subject = new Joke();
      });

      it('uses the default params', () => {
        expect(subject).toMatchSnapshot();
      });
    });

    describe('with params', () => {
      beforeEach(() => {
        subject = new Joke({ id: '42', joke: 'Knock, knock!' });
      });

      it('uses the given params', () => {
        expect(subject).toMatchSnapshot();
      });
    });
  });
});
