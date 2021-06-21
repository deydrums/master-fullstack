import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Topic } from '../../../models/topic';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [UserService]
})
export class AddComponent implements OnInit {
  public page_title: string;
  public topic: Topic;
  public identity: any;
  public token: string;
  public status: any;
  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { 
    this.page_title = "Crear nuevo tema";
    this.topic = new Topic('','','','','','',this.identity._id,null);
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
  }

}
