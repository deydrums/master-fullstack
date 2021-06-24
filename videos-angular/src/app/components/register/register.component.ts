import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public page_title: string;
  public user: User;
  constructor() {
    this.page_title = "Registro";
    this.user = new User(1,'','','','','ROLE_USER','');
   }

  ngOnInit(): void {
  }

  onSubmit(form: Form): void {
    console.log(this.user);
  }
}
