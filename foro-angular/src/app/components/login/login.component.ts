import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public status!: string;
  public page_title: string;
  public user: User;
  public message!: string;

  constructor(
    private _userService: UserService
  ) { 
    this.page_title = "Iniciar sesión";
    this.user = new User('', '', '', '','','','ROLE_USER');
  }

  ngOnInit(): void {
  }

  onSubmit(form:any){
    console.log(this.user);
  }

}
