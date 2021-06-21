import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  public status!: string;
  public page_title: string;
  public user: User;
  public message!: string;

  constructor() {
    this.page_title = "Ajustes de usuario";
    // id , name , surname, email, password, image, rule
    this.user = new User('','','','','','','ROLE_USER');
   }

  ngOnInit(): void {
  }
  onSubmit(form:any): void{
    
  }
}
