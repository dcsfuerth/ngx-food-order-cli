import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ApiRequestEffects, RouterEffects } from '@dcs/ngx-tools';
import { EffectsModule } from '@ngrx/effects';
import { ApiInterceptor } from '../reducers/auth/api.interceptor';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    EffectsModule.forFeature([ApiRequestEffects, RouterEffects]),
  ],
  declarations: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
