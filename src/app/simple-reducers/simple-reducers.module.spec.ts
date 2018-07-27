import { SimpleReducersModule } from './simple-reducers.module';

describe('SimpleReducersModule', () => {
  let simpleReducersModule: SimpleReducersModule;

  beforeEach(() => {
    simpleReducersModule = new SimpleReducersModule();
  });

  it('should create an instance', () => {
    expect(simpleReducersModule).toBeTruthy();
  });
});
