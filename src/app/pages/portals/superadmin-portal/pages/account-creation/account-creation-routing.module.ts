import { UsersModule } from './users/users.module';
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountCreationRoutingModule {}
