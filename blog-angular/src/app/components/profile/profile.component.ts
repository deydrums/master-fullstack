import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { global } from '../../services/global';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [PostService, UserService]
})
export class ProfileComponent implements OnInit {
  page_title: string;
  public posts!: Array<Post>;
  public url;
  public identity;
  public token;
  
  constructor(
    private _postService: PostService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {
    this.page_title = "Pagina de perfil";
    this.url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
   }


   ngOnInit(): void {
    this.getProfile();
  }


  getUser(userId:any){

  }
  
  getProfile(){
    this._route.params.subscribe(params => {
      let userId = +params['id'];
      this.getPosts(userId);
      });
  }

  getPosts(userId:any){
    this._userService.getPosts(userId).subscribe(
      response =>{
        this.getProfile();
      },
      error =>{
        console.log(<any>error);
      }
    );

  }

    
  deletePost(id:any) {
    this._postService.delete(this.token,id).subscribe(
      response => {
        this._route.params.subscribe(params => {
          let userId = +params['id'];
          this.getPosts(userId);
          });
      },
      error => {
        console.log(<any>error);
      }
    )
  }

}
