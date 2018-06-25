import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JokesPageComponent } from './jokes-page/jokes-page.component';

const routes: Routes = [{ path: '', component: JokesPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JokesRoutingModule {}
