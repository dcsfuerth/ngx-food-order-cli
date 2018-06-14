import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductEditPageComponent } from './product-edit/product-edit-page.component';
import { ProductNewPageComponent } from './product-new/product-new-page.compponent';
import { ProductsListPageComponent } from './products-list/products-list-page.component';

export const routes: Routes = [
  { path: '', component: ProductsListPageComponent },
  { path: 'new', component: ProductNewPageComponent },
  { path: ':id/edit', component: ProductEditPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
