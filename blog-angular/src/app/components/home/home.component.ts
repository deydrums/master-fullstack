import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { global } from '../../services/global';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PostService, UserService]
})
export class HomeComponent implements OnInit {
  page_title: string;
  public posts!: Array<Post>;
  public url;
  public identity;
  public token;
  
  constructor(
    private _postService: PostService,
    private _userService: UserService
  ) {
    this.page_title = "Pagina de inicio";
    this.url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
   }

  ngOnInit(): void {
    this.getPosts();
    console.log(this.identity);
  }


  
  getPosts(){
    this._postService.getPosts().subscribe(
      response =>{
        if(response.status == 'success'){
          this.posts = response.posts;
          console.log(this.posts);
        }
      },
      error =>{
        console.log(<any>error);
      }
    );

  }

}
