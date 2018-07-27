import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimpleReducersPageComponent } from './simple-reducers-page/simple-reducers-page.component';

const routes: Routes = [{ path: '', component: SimpleReducersPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SimpleReducersRoutingModule {}
