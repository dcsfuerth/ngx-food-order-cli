import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { APP_ENVIRONMENT, NgxToolsModule } from '@dcs/ngx-tools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppEffects } from './app.effects';
import { ComponentsModule } from './components/components.module';
import { CoreModule } from './core/core.module';
import { metaReducers, reducers } from './reducers';
import * as fromRoot from './reducers';
import { HomeEffects } from './reducers/home/home.effects';
import { environment } from '../environments/environment';

export const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<fromRoot.State>>(
  'Registered Reducers'
);

export function getReducers() {
  return fromRoot.reducers;
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    ComponentsModule,
    NgxToolsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    // ngrx
    StoreModule.forRoot(REDUCER_TOKEN, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects, HomeEffects]),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
    }),
  ],
  providers: [
    { provide: APP_ENVIRONMENT, useValue: environment },
    {
      provide: REDUCER_TOKEN,
      useFactory: getReducers,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
