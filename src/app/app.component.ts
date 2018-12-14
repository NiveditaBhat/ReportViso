import * as d3 from 'd3-3';
import { Component, Injectable, ViewEncapsulation, OnInit } from '@angular/core';
import { AuthService } from './auth/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  authStatus = false ;
  isReprtPage = false;
  imagePreview;
  csvContent ;
  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    console.log('url:' + this.router.url);
    this.authService.authStatus.subscribe(
      (isAuthenticated) => {
this.authStatus = isAuthenticated;
      }
    );


 /*  if (this.router.url.indexOf('/main/report') !== -1 && this.authStatus === true) {
this.isReprtPage = true;
   }*/
console.log('isReprtPage' + this.isReprtPage);
  }


}
