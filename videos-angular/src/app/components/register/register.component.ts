import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public page_title: string;
  public user: User;
  constructor(
    private _userService: UserService
  ) {
    this.page_title = "Registro";
    this.user = new User(1,'','','','','ROLE_USER','');
   }

  ngOnInit(): void {
    console.log(this._userService.test());
  }

  onSubmit(form: Form): void {
    console.log(this.user);
  }
}
