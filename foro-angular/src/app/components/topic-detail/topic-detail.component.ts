import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Topic } from '../../models/topic';
import { TopicService } from 'src/app/services/topic.service';
import { Comment } from '../../models/comment';
import { User } from '../../models/user';
import { UserService } from 'src/app/services/user.service';
import { CommentService } from 'src/app/services/comment.service';
@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css'],
  providers: [TopicService, UserService, CommentService]
})
export class TopicDetailComponent implements OnInit {
  public topic!: Topic;
  public comment: Comment;
  public identity;
  public token;
  public status!: string;
  public message!: string;
  constructor(
    private _topicService: TopicService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _commentService: CommentService
  ) { 
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.comment = new Comment('','','',this.identity._id);
  }

  ngOnInit(): void {
    this.getTopic();
  }

  getTopic(){
    this._route.params.subscribe(params =>{
      let id = params['id'];
      this._topicService.getTopicById(id).subscribe(
        response =>{
          if(response.topic){
            this.topic = response.topic;
          }else{
            this._router.navigate(['/inicio']);
          }
        },
        error =>{
          console.log(<any>error)
        }
      );

    });

  }

  onSubmit(form:any):void{
    this._commentService.add(this.token, this.comment, this.topic._id).subscribe(
      response =>{
        if(!response.topic){
          this.status = 'error';
          this.message = 'Ha ocurrido un error, intenta de nuevo.';
        }else{
          this.topic = response.topic;
          this.message = response.message;
          this.status = 'success';
          form.reset();
        }
      },
      error =>{
        console.log(<any>error);
        this.status = 'error';
        this.message = error.error.message;
      }
    )
  }
}


