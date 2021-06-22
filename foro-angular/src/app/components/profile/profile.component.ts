import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { global } from 'src/app/services/global';
import { TopicService } from 'src/app/services/topic.service';
import { Topic } from 'src/app/models/topic';
import { Router, Params, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService , TopicService]
})
export class ProfileComponent implements OnInit {
  public user!: User;
  public topics: Topic[] = [];
  public url: string;
  public page_title: string;
  constructor(
    private _userService: UserService,
    private _topicService: TopicService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.url = global.url;
    this.page_title = "Perfil";
   }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      var userId = params['id'];
      this.getUser(userId);
      this.getTopics(userId);
    });
  }

  getUser(userId: any){
    this._userService.getUser(userId).subscribe(
      response => {
        if(response.user){
          this.user = response.user;
        }else{

        }
      
      },
      error => {
        console.log(<any>error);

      }
    )
  };

  getTopics(userId: any){
    this._topicService.getTopicsByUser(userId).subscribe(
      response => {
        if(response.topics){
          this.topics = response.topics;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  };
}
