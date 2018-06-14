import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { OrderEditPageComponent } from './order-edit/order-edit-page.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { OrdersListPageComponent } from './orders-list/orders-list-page.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { ComponentsModule } from '../components/components.module';

const routes: Routes = [
  { path: '', component: OrdersListPageComponent },
  { path: ':id/edit', component: OrderEditPageComponent },
];

@NgModule({
  declarations: [
    OrdersListComponent,
    OrdersListPageComponent,
    OrderEditPageComponent,
    OrderFormComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes), ComponentsModule],
})
export class OrderModule {}
