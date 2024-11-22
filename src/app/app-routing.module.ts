import { NgModule } from '@angular/core';
import { RouterModule, Routes,CanActivate } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DialogModule } from 'primeng/dialog';
import { ApplicationComponent } from './pages/application/application.component';
import { ComingsoonComponent } from './modules/comingsoon/comingsoon/comingsoon.component';
import { AfterLoginService } from './Services/after-login.service';
import { KycVerifyService } from './Services/kyc-verify.service';
import { UserRoleService } from './Services/userRole.service';
import { OtpvefrifyComponent } from './otpvefrify/otpvefrify.component';
import { TwofactorauthComponent } from './twofactorauth/twofactorauth.component';
import { GoogleauthComponent } from './googleauth/googleauth.component';
import { MarketComponent } from './market/market.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'comingsoon',
    component: ComingsoonComponent,
  },
  {
    path: 'otpverify',
    component: OtpvefrifyComponent,
  },
  {
    path: 'twofactorauth',
    component: TwofactorauthComponent,
  },
  {
    path: 'googleauth',
    component: GoogleauthComponent,
  },
  {
    path: 'app',
    component: ApplicationComponent,
    children: [
      {
        path: '',
        component: MarketComponent,
      },
      //old
      // {
      //   path: 'home',
      //   loadChildren: () =>
      //     import('./modules/home/home.module').then((m) => m.HomeModule),
      //   canActivate: [AfterLoginService, KycVerifyService],
      // },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./modules/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
        canActivate: [AfterLoginService, KycVerifyService],
      },
      {
        path: 'market',
        component: MarketComponent,
      },
      {
        path: 'user-profile',
        loadChildren: () =>
          import('./modules/user-profile/user-profile.module').then(
            (m) => m.UserProfileModule
          ),
        canActivate: [AfterLoginService],
      },
      // {
      //   path: 'marketplace',
      //   loadChildren: () =>
      //     import('./modules/marketplace/marketplace.module').then(
      //       (m) => m.MarketplaceModule
      //     ),
      //   canActivate: [AfterLoginService, KycVerifyService],
      // },
      {
        path: 'panel',
        loadChildren: () =>
          import('./modules/submainpanel/submainpanel.module').then(
            (m) => m.SubmainpanelModule
          ),
        canActivate: [AfterLoginService, KycVerifyService],
      },
      {
        path: 'wallets',
        loadChildren: () =>
          import('./modules/wallets/wallets.module').then(
            (m) => m.WalletsModule
          ),
        canActivate: [AfterLoginService, KycVerifyService],
      },
      // {
      //   path: 'history',
      //   loadChildren: () =>
      //     import('./modules/history/history.module').then(
      //       (m) => m.HistoryModule
      //     ),
      //   canActivate: [AfterLoginService, KycVerifyService],
      // },
    ],
  },
];

@NgModule({
  imports: [
    DialogModule,
    
    RouterModule.forRoot(routes)],
  exports: [
    DialogModule,
    RouterModule]
})

export class AppRoutingModule { }
