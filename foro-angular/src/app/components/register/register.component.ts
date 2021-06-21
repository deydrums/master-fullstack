import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';


@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public page_title: string;
  public user: User;
  constructor() {
    this.page_title = "Registrate";
    // id , name , surname, email, password, image, rule
    this.user = new User('','','','','','','');
   }

  ngOnInit(): void {
  }

  onSubmit(form:any): void{
    console.log(this.user);
  }

}
