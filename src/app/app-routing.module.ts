import { NgModule } from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';
import { AuthComponent } from './auth/auth/auth.component';
import { LoginComponent } from './auth/auth/login/login.component';
import { SignupComponent } from './auth/auth/signup/signup.component';

import { MainComponent } from './main/main.component';
import { LogoutComponent } from './main/logout/logout.component';
import { ReportComponent } from './main/report/report.component';
import { HomeComponent } from './main/home/home.component';
import { SummaryComponent } from './main/report/summary/summary.component';
import { DetailedTableComponent } from './main/report/detailed-table/detailed-table.component';
import { ReportListComponent } from './main/report-list/report-list.component';
import { AuthGuard } from './auth/auth/auth-gaurd.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ViewerComponent } from './main/report/viewer/viewer.component';
import { WelcomeComponent } from './welcome/welcome.component';

const route: Routes = [{path: '', component: WelcomeComponent},
{path: 'auth', component: AuthComponent, children: [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent}
]
},
{path: 'main', component: MainComponent, canActivateChild: [AuthGuard], children: [
  {path: 'home', component: HomeComponent},
  {path: 'reportList', component: ReportListComponent},
  {path: 'report', component: ReportComponent, children: [
    {path: 'summary', component: SummaryComponent},
    {path: 'detail', component: DetailedTableComponent},
    {path: 'viewer', component: ViewerComponent},
  ]},
  {path: 'logout', component: LogoutComponent}

]
},
{path: '**', component: PageNotFoundComponent}


];

@NgModule({

  imports: [
    RouterModule.forRoot(route)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
