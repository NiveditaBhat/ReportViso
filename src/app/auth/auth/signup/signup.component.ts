import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
loader = false;
dialog = false;
title = '';
message = '';
isSigned = false;
@ViewChild('signupForm') signFm;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
   this.loader = true;
   this.dialog = false;
   this.isSigned = false;
 const newUser = {'email' : form.form.value.email, 'password': form.form.value.pwd};
this.authService.createUser(newUser).subscribe(
  (response) => {
  console.log(response);
this.loader = false;
  this.dialog = true;
  this.isSigned = true;
  this.message = 'Please "Login" to continue';
  this.title = 'You have successfully signed up with ReportViso';
// this.router.navigate(['/auth/login']);
  },
  error => {
    this.loader = false;
  this.dialog = true;
  this.isSigned = false;
    this.message = 'Email you entered is already registered with us. Please try again with a new email';
    this.title = 'Signing up with ReportViso Failed! ';
  }
      );

  }

  onOk() {
if (this.isSigned === true) {
this.signFm.form.reset();
this.router.navigate(['/auth/login']);
}
  }

}
