import { ApiGetRequest } from '@dcs/ngx-tools';
import { IJoke } from './joke.class';
import { jokesManager } from './jokes.manager';

export interface IJokesResponse {
  type: string;
  value: IJoke[];
}

export class FetchJokes extends ApiGetRequest {
  constructor(count: number = 5) {
    super(
      `http://api.icndb.com/jokes/random/${count}`,
      jokesManager.actions.fetch.base,
      jokesManager.schema,
      undefined,
      // the real data is embedded, unpack before giving it
      // to the normalized tool chain
      (data: IJokesResponse) => data.value
    );
  }
}
