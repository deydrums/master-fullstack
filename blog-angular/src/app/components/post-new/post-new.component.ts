import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Category } from 'src/app/models/category';
import { CategoryService } from '../../services/category.service';
import { Post } from '../../models/post';
import { global } from '../../services/global';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
  providers: [UserService,CategoryService, PostService]
})
export class PostNewComponent implements OnInit {
  public page_title: string;
  public identity: any;
  public token: any;
  public post!: Post;
  public categories: any;
  public url!: string;
  public status!: any;
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
    this.page_title = 'Crear una nueva entrada';
    this.description = 'Crea una nueva entrada para el blog';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url;
   }

  ngOnInit(): void {
    this.getCategories();
    this.post = new Post(1,this.identity.sub,1,'','',null,null);
    //console.log(this.post);
    
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
    this._postService.create(this.token,this.post).subscribe(
      response =>{
        if(response.status == 'success'){
          this.post = response.post;
          this.status = 'success';
          this._router.navigate(['inicio']);
        }else{
          this.status = 'error';
        }

      },
      error =>{
        console.log(<any>error);
        this.status = 'error';
      }
    );
  }

}
