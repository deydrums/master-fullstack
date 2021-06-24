import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {
  public page_title !: string;
  public user: User;
  public status!: string;
  public message!: string;
  public token!: any;
  public identity!: any;
  constructor(
    private _userService: UserService
  ) {
    this.page_title = "Ajustes de usuario";
    this.user = this._userService.getIdentity();
    this.token = this._userService.getToken();
   }

  ngOnInit(): void {
  }

  onSubmit(form: any): void {
    this._userService.edit(this.user,this.token).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = response.status;
          this.message = response.message;
          this.identity = response.user;
          this.user = response.user;
          localStorage.setItem('identity',JSON.stringify(this.identity));
        }else{
          this.status = response.status;
          this.message = response.message;
        }
      },
      error => {
        this.status = 'error';
        this.message = 'Ha ocurrido un error, intenta de nuevo.';
      }
    )
  }
}
