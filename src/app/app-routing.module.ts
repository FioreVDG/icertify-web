import { NotfoundComponent } from './pages/notfound/notfound.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/logins/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/logins/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'superadmin-login',
    loadChildren: () =>
      import('./pages/logins/superadmin-login/superadmin-login.module').then(
        (m) => m.SuperadminLoginModule
      ),
  },
  {
    path: 'notary-portal',
    loadChildren: () =>
      import('./pages/portals/notary-portal/notary-portal.module').then(
        (m) => m.NotaryPortalModule
      ),
  },
  {
    path: 'barangay-portal',
    loadChildren: () =>
      import('./pages/portals/barangay-portal/barangay-portal.module').then(
        (m) => m.BarangayPortalModule
      ),
  },
  {
    path: 'superadmin-portal',
    loadChildren: () =>
      import('./pages/portals/superadmin-portal/superadmin-portal.module').then(
        (m) => m.SuperadminPortalModule
      ),
  },
  {
    path: '404',
    component: NotfoundComponent,
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
