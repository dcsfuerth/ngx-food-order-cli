import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ApiRequestEffects, RouterEffects } from '@dcs/ngx-tools';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    EffectsModule.forFeature([ApiRequestEffects, RouterEffects]),
  ],
  declarations: [],
})
export class CoreModule {}
