import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [
    UserService
  ]
})
export class RegisterComponent implements OnInit {
    public page_title: string;
    public user: User;

  constructor(
    private _userService: UserService
  ) { 
    this.page_title = "Registrate";
    this.user = new User(1,'','','ROLE_USER','','','','');

  }

  ngOnInit(): void {
    console.log('Componente de registro lanzado');
    console.log(this._userService.test());

  }

  onSubmit(form:any){
    this._userService.register(this.user).subscribe(
      response =>{
        console.log(response);
        form.reset();
      },
      error =>{
        console.log(<any>error);
      }
    );
    
  }
}
