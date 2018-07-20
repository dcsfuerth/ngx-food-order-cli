import { FetchJokes } from './jokes.actions';

describe('Jokes Actions', () => {
  describe('FetchJokes', () => {
    let subject: FetchJokes;

    beforeAll(() => {
      subject = new FetchJokes();
    });

    it('generates the correct API action format', () => {
      expect(subject).toMatchSnapshot();
    });
  });
});
