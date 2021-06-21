import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {
  public status!: string;
  public page_title: string;
  public user: User;
  public identity: any;
  public token:any;
  public message!: string;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route : ActivatedRoute
  ) {
    this.page_title = "Ajustes de usuario";
    // id , name , surname, email, password, image, rule
    this.user = new User('','','','','','','ROLE_USER');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = this.identity;
   }

  ngOnInit(): void {
  }
  onSubmit(form:any): void{
    console.log(this.user);
  }
}
