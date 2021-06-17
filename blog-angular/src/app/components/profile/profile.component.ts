import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { global } from '../../services/global';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { User } from '../../models/user'

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
  public user!: User;
  
  constructor(
    private _postService: PostService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {
    this.page_title = "Perfil de ";
    this.url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
   }


   ngOnInit(): void {
    this.getProfile();
  }


  getUser(userId:any){
    this._userService.getUser(userId).subscribe(
      response =>{
        this.user = response.user;
        //console.log(this.user);
      },
      error =>{
        console.log(<any>error);
      }
    );
  }


  
  getProfile(){
    this._route.params.subscribe(params => {
      let userId = +params['id'];
      this.getUser(userId);
      this.getPosts(userId);
      });
  }

  getPosts(userId:any){
    this._userService.getPosts(userId).subscribe(
      response =>{
        this.posts = response.posts;
        console.log(this.posts);
      },
      error =>{
        console.log(<any>error);
      }
    );

  }

    
  deletePost(id:any) {
    this._postService.delete(this.token,id).subscribe(
      response => {
        this.getProfile();
      },
      error => {
        console.log(<any>error);
      }
    )
  }

}
