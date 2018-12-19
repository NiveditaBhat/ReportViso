import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../auth/auth/auth.service';
import { Router } from '@angular/router';
import { ReportService } from '../../main/report.service';
import { Subscription } from 'rxjs';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
isAuthenticated = false;
isPanelLoaded = false;
subscription1: Subscription;
subscription2: Subscription;

  constructor(private authService: AuthService, private router: Router, private reportService: ReportService) { }

  ngOnInit() {
 //   this.isAuthenticated = this.authService.getAuthStatus();
    this.authService.authStatus.subscribe(
      (isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
      }
    );

   // $('.btn-expand-collapse').click(function(e) {
     // $('.navbar-primary').toggleClass('collapsed');
//});

this.subscription1 = this.reportService.panelLoaded.asObservable().subscribe(() =>{
this.isPanelLoaded = true;

});

this.subscription2 = this.reportService.panelUnLoaded.asObservable().subscribe(() => {
  this.isPanelLoaded = false;
});
  }

  ngOnDestroy() {
this.subscription1.unsubscribe();
this.subscription2.unsubscribe();
  }

  onLogOut() {
    this.authService.logOut();
  }

  signupForm() {
    this.router.navigate(['/auth/signup']);
    }

    loginForm() {
      this.router.navigate(['/auth/login']);
    }

}
