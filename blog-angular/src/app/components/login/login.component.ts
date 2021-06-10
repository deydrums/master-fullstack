import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public page_title: string;
  public user:User;

  constructor(
    private userService: UserService
  ) { 
    this.page_title = 'Identificate';
    this.user = new User(1,'','','ROLE_USER','','','','');

  }

  ngOnInit(): void {
  }

  onSubmit(form:any){
    console.log(this.user);
  }
}
