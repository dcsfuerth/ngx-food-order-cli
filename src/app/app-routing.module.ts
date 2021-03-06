import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './reducers/auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomeModule', canActivateChild: [AuthGuard] },

  {
    path: 'jokes',
    loadChildren: './jokes/jokes.module#JokesModule',
    canActivateChild: [AuthGuard],
  },

  {
    path: 'simple-reducers',
    loadChildren: './simple-reducers/simple-reducers.module#SimpleReducersModule',
  },

  {
    path: 'users',
    loadChildren: './users/users.module#UsersModule',
    canActivateChild: [AuthGuard],
  },
  {
    path: 'products',
    loadChildren: './products/products.module#ProductsModule',
    canActivateChild: [AuthGuard],
  },
  {
    path: 'order',
    loadChildren: './order/order.module#OrderModule',
    canActivateChild: [AuthGuard],
  },
  // last one
  { path: '**', loadChildren: './not-found/not-found.module#NotFoundModule' },
];

@NgModule({
  imports: [AuthModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
