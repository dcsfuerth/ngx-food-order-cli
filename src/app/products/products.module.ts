import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ProductEditPageComponent } from './product-edit/product-edit-page.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductNewPageComponent } from './product-new/product-new-page.compponent';
import { ProductsListPageComponent } from './products-list/products-list-page.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    ProductsListComponent,
    ProductsListPageComponent,
    ProductNewPageComponent,
    ProductEditPageComponent,
    ProductFormComponent,
  ],
  imports: [ProductsRoutingModule, CommonModule, ReactiveFormsModule, ComponentsModule],
})
export class ProductsModule {}
