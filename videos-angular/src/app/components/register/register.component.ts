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
  public status!: string;
  public message!: string;
  constructor(
    private _userService: UserService
  ) {
    this.page_title = "Registro";
    this.user = new User(1,'','','','','ROLE_USER','');
   }

  ngOnInit(): void {
  }

  onSubmit(form: Form): void {
    this._userService.register(this.user).subscribe(
      response => {
        if(response.status == 'success' && response.user){
          this.message = response.message;
          this.status = response.status;
        }else{
          this.message = response.message;
          this.status = response.status;
        }
      },
      error => {
        console.log(<any>error);
        this.message = 'Ha ocurrido un error, intenta de nuevo.';
        this.status = 'error';
      }
    )
  }
}
