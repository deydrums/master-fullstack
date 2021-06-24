import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public page_title: string;
  public user: User;
  public status!: string;
  public message!: string;
  public token!: string;
  public identity!: string;
  constructor(
    private _userService: UserService
  ) { 
    this.page_title = "Iniciar sesion";
    this.user = new User(1,'','','','','ROLE_USER','');

  }

  ngOnInit(): void {
  }

  onSubmit(form: any): void {
    this._userService.login(this.user).subscribe(
      response => {
        if(response.status == 'success'){
          this.message = response.message;
          this.status = response.status;
          this.identity = response.user;
          //Sacar el token
          this._userService.login(this.user,'true').subscribe(
            response => {
              if(response.status == 'success'){
                this.token = response.token;
                //console.log(this.token);
                //console.log(this.identity);
              }else{
                this.message = response.message;
                this.status = response.status;
              }

            },
            error => {
              this.message = 'Ha ocurrido un error, intenta de nuevo.';
              this.status = 'error';
            }
          );
          form.reset();
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
