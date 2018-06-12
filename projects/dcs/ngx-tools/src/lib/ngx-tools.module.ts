import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ApiRequestEffects } from './store/api-request/api-request.effects';

@NgModule({
  imports: [HttpClientModule, EffectsModule.forFeature([ApiRequestEffects])],
  declarations: [],
  exports: [],
  providers: [],
})
export class NgxToolsModule {}
