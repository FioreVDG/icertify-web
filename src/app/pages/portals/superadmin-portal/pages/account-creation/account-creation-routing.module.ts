import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountCreationComponent } from './account-creation.component';

const routes: Routes = [
  {
    path: '',
    component: AccountCreationComponent,
    children: [
      {
        path: 'users',
        loadChildren: () =>
          import('./../account-creation/users/users.module').then(
            (m) => m.UsersModule
          ),
      },
      {
        path: 'notarial',
        loadChildren: () =>
          import('./../account-creation/notarial/notarial.module').then(
            (m) => m.NotarialModule
          ),
      },
      {
        path: 'access-roles',
        loadChildren: () =>
          import('./../account-creation/access-roles/access-roles.module').then(
            (m) => m.AccessRolesModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountCreationRoutingModule {}
