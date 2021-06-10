import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  public page_title: string;
  public user: User;
  constructor() { 
    this.page_title = 'Ajustes';
    this.user = new User(1,'','','ROLE_USER','','','','');
  }
    
  ngOnInit(): void {
  }

  onSubmit(form:any){
  
  }
}
