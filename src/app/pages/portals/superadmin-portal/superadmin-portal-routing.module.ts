import { SuperadminPortalComponent } from './superadmin-portal.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: SuperadminPortalComponent,

    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'account-creation',
      },
      {
        path: 'account-creation',
        loadChildren: () =>
          import('./pages/account-creation/account-creation.module').then(
            (m) => m.AccountCreationModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuperadminPortalRoutingModule {}
