import { Injectable } from '@angular/core';
import { User } from './user.model';
import {HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  authStatus = new Subject<boolean>();
  backendURL = 'http://localhost:3000/';
  isAuthenticated = false;
private token;
private tokenTimer ;
private userId;

  constructor(private http: HttpClient, private router: Router) {

  }

setUserId(userId: string) {
this.userId =  userId;
}

getUserId(){
  return this.userId;
}

setToken(token : string){
this.token = token;
}

getToken(){
  return this.token;
}



  createUser(newUser: User) {
   return this.http.post<{message: string, user: User}>(this.backendURL + 'api/user/signup', newUser);
  }

  authenticateUser(user: User) {
return this.http.post<{message: string, token: string,
  expiresIn: number, userId: string}>(this.backendURL + 'api/user/login', user);
  }

  getAuthStatus() {
    return this.isAuthenticated;
  }

  setAuthStatus(status) {
this.isAuthenticated = status;
  }

  saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
      }

      setAuthTimer(expiresIn) {
this.tokenTimer = setTimeout(() => {
  this.logOut();
}, expiresIn * 1000);
      }

      clearAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationDate');
        localStorage.removeItem('userId');
      }



      logOut() {
        this.isAuthenticated = false;
        clearTimeout(this.tokenTimer);
        this.authStatus.next(false);
        this.clearAuthData();
        this.router.navigate(['/']);

      }

      getAuthStatusListner() {
        return this.authStatus.asObservable();
      }
}
