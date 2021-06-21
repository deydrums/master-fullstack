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
  public status!: string;
  public page_title: string;
  public user: User;
  public message!: string;
  constructor(
    private _userService: UserService
  ) {
    this.page_title = "Registrate";
    // id , name , surname, email, password, image, rule
    this.user = new User('','','','','','','ROLE_USER');
   }

  ngOnInit(): void {
  }

  onSubmit(form:any): void{
    this._userService.register(this.user).subscribe(
      response => {
        if(response.user && response.user._id){
          this.status = 'success';
          this.message = response.message;
          //console.log(this.message);
          //console.log(response);
          form.reset();
        }else{
          this.status = 'error';
          this.message = 'Ha ocurrido un error, intenta de nuevo.';
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
