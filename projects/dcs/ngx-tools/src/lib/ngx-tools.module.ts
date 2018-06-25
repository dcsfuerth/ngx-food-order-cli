import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { ApiRequestEffects } from './store/api-request/api-request.effects';
import { RouterEffects } from './store/router/router.effects';

@NgModule({
  imports: [HttpClientModule, EffectsModule.forFeature([ApiRequestEffects, RouterEffects])],
  declarations: [],
  exports: [],
  providers: [],
})
export class NgxToolsModule {}
