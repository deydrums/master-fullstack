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
  public identity!:any;
  public token!: any;
  constructor(
    private _userService: UserService
  ) { 
    this.page_title = "Iniciar sesión";
    this.user = new User('', '', '', '','','','ROLE_USER');
  }

  ngOnInit(): void {
  }

  onSubmit(form:any){
    //Conseguir objeto compoleto del usuario logueado
    this._userService.singup(this.user).subscribe(
      response =>{
        if(response.user && response.user._id){
          //console.log(response);
          this.status = 'success';
          this.identity = response.user;
          console.log(this.identity);
          this.message = response.message;
          //Conseguir el token del usuario identificado
          this._userService.singup(this.user, true).subscribe(
            response =>{
              if(response.token){
                //Guardar el token del usuario identificado
                this.token = response.token;
                //console.log(this.token);
              }else{
                this.status = 'error';
                this.message = 'Ha ocurrido un error, intenta de nuevo.'
              }
            },
            error => {
              //console.log(<any>error);
              this.message = error.error.message;
              this.status = 'error';
            }
          );






        }else{
          this.status = 'error';
          this.message = 'Ha ocurrido un error, intenta de nuevo.'
        }
      },
      error => {
        //console.log(<any>error);
        this.message = error.error.message;
        this.status = 'error';
      }
    );
  }

}
