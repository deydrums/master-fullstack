import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
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
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
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
          this.identity = response.user;
          localStorage.setItem('identity',JSON.stringify(this.identity));
          //Conseguir el token del usuario identificado
          this._userService.singup(this.user, true).subscribe(
            response =>{
              if(response.token){
                //Guardar el token del usuario identificado
                this.token = response.token;
                localStorage.setItem('token',JSON.stringify(this.token));
                this.status = 'success';
                this.message = response.message;
                this._router.navigate(['/inicio']);
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
