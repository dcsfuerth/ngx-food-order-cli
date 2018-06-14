import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { UserEditPageComponent } from './user-edit/user-edit-page.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserNewPageComponent } from './user-new/user-new-page.component';
import { UsersListPageComponent } from './users-list/users-list-page.component';
import { UsersListComponent } from './users-list/users-list.component';
import { ComponentsModule } from '../components/components.module';

export const routes: Routes = [
  { path: '', component: UsersListPageComponent },
  { path: ':id/edit', component: UserEditPageComponent },
  { path: 'new', component: UserNewPageComponent },
];

@NgModule({
  declarations: [
    UsersListPageComponent,
    UsersListComponent,
    UserEditPageComponent,
    UserFormComponent,
    UserNewPageComponent,
  ],
  imports: [RouterModule.forChild(routes), CommonModule, ReactiveFormsModule, ComponentsModule],
})
export class UsersModule {}
