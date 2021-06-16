import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Category } from 'src/app/models/category';
import { CategoryService } from '../../services/category.service';
import { Post } from '../../models/post';
import { global } from '../../services/global';
import { PostService } from 'src/app/services/post.service';


@Component({
  selector: 'app-post-edit',
  templateUrl: '../post-new/post-new.component.html',
  providers: [UserService,CategoryService, PostService]
})
export class PostEditComponent implements OnInit {
  public page_title: string;
  public identity: any;
  public token: any;
  public post!: Post;
  public categories: any;
  public url!: string;
  public status!: any;
  public category!: any;
  public user!: any;
  public description!:any;
  
  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.png,jpeg",
    maxSize: 3,
    uploadAPI:  {
      url: global.url+"post/upload",
      headers: {
     "Authorization" : this._userService.getToken()
      }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    fileNameIndex: true,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Subir',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Sube tu avatar...',
      afterUploadMsg_success: 'Carga completa !',
      afterUploadMsg_error: 'LA carga ha fallado !',
      sizeLimit: 'Fuera del tamaño permitido'
    }
};

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _postService: PostService
  ) {
    this.page_title = "Editar Entrada";
    this.description = 'Modificar entrada del blog';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url;
   }



  ngOnInit(): void {
    this.getCategories();
    this.post = new Post(1,this.identity.sub,1,'','',null,null);
    this.getPost();
    
  }

  getCategories(){
    this._categoryService.getCategories().subscribe(
      response =>{
        if(response.status == 'success'){
          this.categories = response.categories;
        }
      },
      error =>{
        console.log(<any>error);
      }
    )
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
            //console.log(this.post);
            if(this.user.id != this.identity.sub){
              this._router.navigate(['/inicio']);
            }
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

  imageUpload(datos:any){
    if(datos.status == 400){
      console.log(datos.error);
    }else if(datos.status == 200){
    console.log(datos.body);
    let image_data = datos.body.image;
    this.post.image = image_data;
    }
  }

  onSubmit(form:any){
    this._postService.update(this.token,this.post,this.post.id).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = 'success';
          //this.post = response.post;
          this._router.navigate(['/entrada/',this.post.id]);
        }else{
          this.status = 'error';
        }
      },
      error => {
        console.log(<any>error);
        this.status = 'error';
      }
    )
  }


}
