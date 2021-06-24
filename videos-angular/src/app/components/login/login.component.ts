import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public page_title: string;
  constructor() { 
    this.page_title = "Iniciar sesion";

  }

  ngOnInit(): void {
  }

  onSubmit(form: any): void {

  }

}
