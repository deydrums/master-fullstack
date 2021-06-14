import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { global } from '../../services/global';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PostService]
})
export class HomeComponent implements OnInit {
  page_title: string;
  public posts!: Array<Post>;
  public url;

  constructor(
    private _postService: PostService
  ) {
    this.page_title = "Pagina de inicio";
    this.url = global.url;
   }

  ngOnInit(): void {
    this.getPosts();
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
