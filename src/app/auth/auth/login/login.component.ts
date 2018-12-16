import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loader = false;
userId;
loginFailed = false;
guestUser = false;
  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.guestUser = false;
    this.activatedRoute.queryParams.subscribe(
      (param) => {
        if (param['guest']) {
this.guestUser = true;
this.onLogin('neetu@home.com', 'Stay.true1');
        }
      }
    );
  }

  onLogin(email, password) {
    this.loader = true;
    this.loginFailed = false;
const user = {'email' : email, 'password': password};
   this.authService.authenticateUser(user).subscribe(
     (response) => {

   this.loader = false;
   this.loginFailed = false;
if (response.token) {
  console.log(response.token);
  this.authService.setToken(response.token);
  this.authService.setAuthStatus(true);
  this.authService.authStatus.next(true);
  const now = new Date();
  const expirationDate =  new Date(now.getTime() + response.expiresIn * 1000) ;
  this.userId = response.userId;
  this.authService.setUserId(this.userId);
  this.authService.saveAuthData(response.token, expirationDate, this.userId);
 this.authService.setAuthTimer(response.expiresIn);
 this.router.navigate(['/main/home']);
}
     },
     error => {
       console.log(error.message);
       this.loader = false;
       this.loginFailed = true;
     }    );
  }



}
