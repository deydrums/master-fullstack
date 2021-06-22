import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Topic } from '../../../models/topic';
import { UserService } from '../../../services/user.service';
import { TopicService } from '../../../services/topic.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [UserService,TopicService]
})
export class ListComponent implements OnInit {
  public page_title: string;
  public topics!: Array<Topic>;
  public identity: any;
  public token: string;
  public status: any;
  public message!: string;
  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _topicService: TopicService
  ) { 
    this.page_title = "Mis temas";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  } 

  ngOnInit(): void {
    this.getTopics();
  }

  getTopics(){
    var userId = this.identity._id;
    this._topicService.getTopicsByUser(userId).subscribe(
      response => {
        if(response.topics){
          //console.log(response.topics);
          this.topics = response.topics;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }
  deleteTopic(id:any){
    this._topicService.deleteTopic(this.token, id).subscribe(
      response => {
        this.getTopics();
        console.log(response);
      },
      error => {
        console.log(<any>error);
      }
    );
  }
}
