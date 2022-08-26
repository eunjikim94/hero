import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  //message service 내용 뷰로 보여줄라면 주입 
  constructor(public messageService:MessageService) { }

  ngOnInit(): void {
  }

}
