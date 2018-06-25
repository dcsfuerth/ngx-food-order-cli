import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JokesPageComponent } from './jokes-page/jokes-page.component';
import { JokesRoutingModule } from './jokes-routing.module';
import { JokesComponent } from './jokes/jokes.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [CommonModule, JokesRoutingModule, ComponentsModule],
  declarations: [JokesPageComponent, JokesComponent],
})
export class JokesModule {}
