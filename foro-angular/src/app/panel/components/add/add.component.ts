import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Topic } from '../../../models/topic';
import { UserService } from '../../../services/user.service';
import { TopicService } from '../../../services/topic.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [UserService,TopicService]
})
export class AddComponent implements OnInit {
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
    this.page_title = "Crear nuevo tema";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.topic = new Topic('','','','','','',this.identity._id,null);
  } 

  ngOnInit(): void {
  }

  onSubmit(form:any){
    this._topicService.addTopic(this.token,this.topic).subscribe(
      response => {
        if(response.topic){
          console.log(response);
          this.status = 'success';
          this.message = response.message;
          this.topic = response.topic;
          this._router.navigate(['/panel']);
        }else{
          this.status = 'error';
          this.message = 'Ha ocurrido un error, intenta de nuevo';
        }
      },
      error => {
        this.message = 'Ha ocurrido un error, intenta de nuevo';
        this.status = 'error';
      }
    )
  }

}
