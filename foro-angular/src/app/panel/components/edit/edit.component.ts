import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Topic } from '../../../models/topic';
import { UserService } from '../../../services/user.service';
import { TopicService } from '../../../services/topic.service';

@Component({
  selector: 'app-edit',
  templateUrl: '../add/add.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [UserService,TopicService]
})
export class EditComponent implements OnInit {

  public page_title: string;
  public topic: Topic;
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
    this.page_title = "Editar tema";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.topic = new Topic('','','','','','',this.identity._id,null);
  } 

  ngOnInit(): void {
    this.getTopic();
  }

  onSubmit(form: any): void {
    var id = this.topic._id;
    this._topicService.update(this.token, id, this.topic).subscribe(
      response =>{
        if(response.topic) {
          this.status = 'success';
          this.topic = response.topic;
          this.message = response.message;
        }else{
          this.status = "error";
          this.message = "Ha ocurrido un error, intenta de nuevo.";
        }
        console.log(response);
      },
      error =>{
        console.log(<any>error);
        this.status = "error";
        this.message = error.error.message;
      }
    );

  }

  getTopic(){
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._topicService.getTopic(id).subscribe(
        response => {
          if(!response.topic){
            this._router.navigate(['/panel']);
          }else{
            this.topic = response.topic;
          }
        },
        error =>{
          console.log(<any>error);
        }
      )
    });
  }
}
