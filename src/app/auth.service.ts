import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:57717/auth';
  nameKey = 'name';
  tokenKey = 'token';
 
  constructor(private http: HttpClient, private router: Router) { }

  get name() {
    return localStorage.getItem(this.nameKey);
  }

  get isAuthenticated() {
    return !!localStorage.getItem(this.tokenKey);
  }

  get tokenHeader() {
    //let header = new Headers({'Authorization' : 'Bearer ' + localStorage.getItem(this.tokenKey)});
    let options = {
      headers: new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem(this.tokenKey))
      //params: new HttpParams().append('key', 'value')
    }
    return options;
  }

  login(loginData) {
    this.http.post(this.baseUrl + '/login', loginData).subscribe(res => {
      this.authenticate(res);
    });
  }

 
  register(user) {
    delete user.confirmPassword;
    this.http.post(this.baseUrl + '/register', user).subscribe(res => {
      this.authenticate(res);      
    });
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.nameKey);

    //this.router.navigate(['/']);
  }

  authenticate(res){
    let authReponse = res;

      if (!res[this.tokenKey]) {
        return;
      }
      //console.log(res['token']);
      localStorage.setItem(this.tokenKey, authReponse['token']);
      localStorage.setItem(this.nameKey, authReponse['firstName']);
      this.router.navigate(['/']);
  }
}
