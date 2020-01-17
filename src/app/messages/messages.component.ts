import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import  { WebService } from  '../web.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  //messages: any = [{text: 'test', owner: 'Tim'}, {text: 'test', owner: 'Tim'}];
  //messages: any = [];
  //messages;

  constructor(private webService : WebService, private route: ActivatedRoute) { }

  ngOnInit() {
    //console.log(this.route.snapshot.params.name);
    let name = this.route.snapshot.params.name;
    this.webService.getMessages(name);


    //test only
    //this.webService.getUser().subscribe();

    // this.webService.messages.subscribe(messages => {
    // //this.webService.messageSubject.subscribe(messages => {
    //   this.messages = messages});
  }
  // async ngOnInit() {
  //   var response = await this.webService.getMessages();    
  //   this.messages = response;
  // }

}
