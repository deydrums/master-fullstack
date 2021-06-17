import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Post } from '../../models/post';
import { PostService } from 'src/app/services/post.service';
import { User } from 'src/app/models/user';
import { Category } from 'src/app/models/category';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostService, UserService]
})
export class PostDetailComponent implements OnInit {
  public page_title: string;
  public post!: Post;
  public category!: Category;
  public user!: User;
  public identity!:any;

  constructor(
    private _postService: PostService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.page_title = "Entrada";
    this.identity = this._userService.getIdentity();
   }

  ngOnInit(): void {
    this.getPost();
  }

  getPost(){
    //Sacar el id del post de la url
    this._route.params.subscribe(params => {
      let id = +params['id'];
      console.log(id);
      //Peticion Ajax para sacar los datos
      this._postService.getPost(id).subscribe(
        response => {
          if(response.status == 'success'){
            this.post = response.posts;
            this.user = response.posts.user;
            this.category = response.posts.category;
            console.log(this.post);
          }else{
            this._router.navigate(['/inicio']);
          }
        },
        error =>{
          console.log(<any>error);
          this._router.navigate(['/inicio']);
        }
        );
    });
    
  }

}
