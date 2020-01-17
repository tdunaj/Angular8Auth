import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

import  { AuthService } from  './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WebService {
  baseUrl = 'http://localhost:57717/api';

  private messageStore: any = [];

  private messageSubject = new Subject();

  messages = this.messageSubject.asObservable();

  constructor(private http: HttpClient, private sb: MatSnackBar, private auth: AuthService) {
    //this.getMessages();
   }

  getMessages(user) {    
    user = (user) ? '/' + user : '';
    this.http.get(this.baseUrl + '/messages' + user).subscribe(response =>{
      this.messageStore = response;
      this.messageSubject.next(this.messageStore);
    }, error => {
      this.handleError("Unable to get messages");
    });          
  };

  // async getMessages(user) {
  //   try {
  //     user = (user) ? '/' + user : '';
  //     let response = await this.http.get(this.baseUrl + user).toPromise();
  //     this.messages = response;      
  //   } catch (error) {
  //     this.handleError("Unable to get messages");
  //   }
    
  // };

  // getMessages() {
  //   return this.http.get(this.baseUrl).toPromise();
  // };

  async postMessage(message) {
    try {
    let response =  await this.http.post(this.baseUrl + '/messages', message).toPromise();
    this.messageStore.push(response);
    this.messageSubject.next(this.messageStore);
    } catch (error) {
      this.handleError("Unable to post message");
    }
  }

  // postMessage(message) {
  //   return this.http.post(this.baseUrl, message).toPromise();
  // }

  getUser() {
    return this.http.get(this.baseUrl + '/users/me', this.auth.tokenHeader);//.pipe(map(res => res));
  }

  saveUser(userData) {
    return this.http.post(this.baseUrl + '/users/me', userData, this.auth.tokenHeader);//.pipe(map(res => res));
  }


  private handleError(error) {
    console.error(error);
    this.sb.open(error, 'close', { duration: 2000 });
  }
}
