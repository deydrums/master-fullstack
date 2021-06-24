import { Component, OnInit, DoCheck} from '@angular/core';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService]
})
export class HomeComponent implements OnInit, DoCheck {
  public page_title: string;
  public identity!:any;
  public token!:any;
  constructor(
    private _userService: UserService
  ) { 
    this.page_title = "Inicio";
  }

  ngOnInit(): void {
  }

  ngDoCheck(){
    this.loadUser();
  }

  loadUser(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }
}
