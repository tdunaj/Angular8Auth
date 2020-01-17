//import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import  { WebService } from  '../web.service';
import  { AuthService } from  '../auth.service';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css']
})
export class NewMessageComponent implements OnInit {

  message = {
    owner:  this.authService.name,
    text: ""
  }

  constructor(private webService : WebService, private authService : AuthService) { }

  //@Output() onPosted = new EventEmitter();

  ngOnInit() {
  }

  post() {
    //console.log(this.message);
    this.webService.postMessage(this.message);
    //this.onPosted.emit(this.message);
  }
}
