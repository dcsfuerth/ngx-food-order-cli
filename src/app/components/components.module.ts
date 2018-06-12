import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [MainNavigationComponent],
  exports: [MainNavigationComponent],
})
export class ComponentsModule {}
