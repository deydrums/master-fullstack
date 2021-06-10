import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
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

  constructor(
    private _userService: UserService
  ) { 
    this.page_title = 'Identificate';
    this.user = new User(1,'','','ROLE_USER','','','','');

  }

  ngOnInit(): void {
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
        console.log(<any>error);
      }
    );
    
  }
}