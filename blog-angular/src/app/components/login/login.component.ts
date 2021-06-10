import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { faThList } from '@fortawesome/free-solid-svg-icons';
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
  public status!:string;
  public token:any;
  public identity:any;
  public error!:any;
  public name!: string;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { 
    this.page_title = 'Identificate';
    this.user = new User(1,'','','ROLE_USER','','','','');

  }

  ngOnInit(): void {
    this.logout();
  }

  onSubmit(form:any){
    this._userService.signup(this.user).subscribe(
      response =>{
        //TOKEN
        if(response.status != 'error'){
          this.status = 'success';
          this.token = response;

          //Objeto usuario identificado
          this._userService.signup(this.user, true).subscribe(
            response =>{
                this.identity = response;

                //Persistir datos usuario identificado
                localStorage.setItem('token', this.token);
                localStorage.setItem('identity', JSON.stringify(this.identity));
                //Redireccion a inicio
                this.name = this.identity['name'] + ' ' + this.identity['surname'];
                this._router.navigate(['inicio']);
                
            },
            error =>{
              this.status = 'error';
              console.log(<any>error);
            }
          );
        }else{
          this.status = 'error';
        }
      },
      error =>{
        this.status = 'error';
        this.error = error.error.message;
      }
    );
    
  }

  logout() {
    this._route.params.subscribe(params =>{
      let logout = +params['sure'];
      if(logout == 1){
        localStorage.removeItem('identity');
        localStorage.removeItem('token');
        this.identity = null;
        this.token = null;

        //Redireccion a inicio
        this._router.navigate(['inicio']);
      }
    });
  }
}