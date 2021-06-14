import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Post } from '../../models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostService]
})
export class PostDetailComponent implements OnInit {
  public page_title: string;
  public post!: Post;

  constructor(
    private _postService: PostService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.page_title = "Entrada";
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
