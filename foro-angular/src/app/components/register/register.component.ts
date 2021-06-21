import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'register',
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
    this.page_title = "Registrate";
    // id , name , surname, email, password, image, rule
    this.user = new User('','','','','','','');
   }

  ngOnInit(): void {
    console.log(this._userService.prueba());
  }

  onSubmit(form:any): void{
    console.log(this.user);
  }

}
