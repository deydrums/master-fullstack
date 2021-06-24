import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


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
  public token!: any;
  public identity!: any;
  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { 
    this.page_title = "Iniciar sesion";
    this.user = new User(1,'','','','','ROLE_USER','');

  }

  ngOnInit(): void {
    this.logout();
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
                localStorage.setItem('token', this.token);
                localStorage.setItem('identity',JSON.stringify(this.identity));
                this._router.navigate(['inicio']);
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
  logout() {
    this._route.params.subscribe(params => {
      let sure = +params['sure'];
      if(sure == 1 ){
        localStorage.removeItem('identity');
        localStorage.removeItem('token');
        this.identity = null;
        this.token = null;
        this._router.navigate(['/inicio']);
      }
    });
  }

}
