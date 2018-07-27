import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimpleReducersRoutingModule } from './simple-reducers-routing.module';
import { SimpleReducersPageComponent } from './simple-reducers-page/simple-reducers-page.component';

@NgModule({
  imports: [CommonModule, SimpleReducersRoutingModule],
  declarations: [SimpleReducersPageComponent],
})
export class SimpleReducersModule {}
