import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header/header.component';
import { FooterComponent } from './footer/footer/footer.component';
import { AuthComponent } from './auth/auth/auth.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './auth/auth/login/login.component';
import { SignupComponent } from './auth/auth/signup/signup.component';
import {FormsModule} from '@angular/forms';
import { DialogComponent } from './dialog/dialog/dialog.component';
import { LoaderComponent } from './loader/loader.component';
import { AuthService } from './auth/auth/auth.service';
import { AuthInterceptor } from './auth/auth/auth-interceptor';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { MainComponent } from './main/main.component';

import { LogoutComponent } from './main/logout/logout.component';
import { ReportComponent } from './main/report/report.component';
import { HomeComponent } from './main/home/home.component';

import { ReportService } from './main/report.service';
import { SummaryComponent } from './main/report/summary/summary.component';
import { SidepanelComponent } from './main/sidepanel/sidepanel.component';
import {DataTableModule} from 'angular-6-datatable';
import { DetailedTableComponent } from './main/report/detailed-table/detailed-table.component';
import { ReportListComponent } from './main/report-list/report-list.component';
import { AuthGuard } from './auth/auth/auth-gaurd.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ViewerComponent } from './main/report/viewer/viewer.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ReversePipe } from './main/reversePipe.pipe';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AuthComponent,
    LoginComponent,
    SignupComponent,
    DialogComponent,
    LoaderComponent,
    MainComponent,
    LogoutComponent,
    ReportComponent,
    HomeComponent,
    SummaryComponent,
    SidepanelComponent,
    DetailedTableComponent,
    ReportListComponent,
    PageNotFoundComponent,
    ViewerComponent,
    WelcomeComponent,
    ReversePipe,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
   DataTableModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi : true},
  AuthService, ReportService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
