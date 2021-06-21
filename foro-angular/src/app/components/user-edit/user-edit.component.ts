import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { global } from 'src/app/services/global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {
  public status!: string;
  public page_title: string;
  public user: User;
  public identity: any;
  public token:any;
  public message!: string;
  public afuConfig:any;
  public url:string;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route : ActivatedRoute,
  ) {
    this.page_title = "Ajustes de usuario";
    // id , name , surname, email, password, image, rule
    this.user = new User('','','','','','','ROLE_USER');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = this.identity;
    this.url = global.url;

    this.afuConfig={
      multiple: false,
      formatsAllowed: ".jpg, .jpeg, .png, .gif",
      maxSize: 50,
      uploadAPI:{
        url: this.url+'upload-avatar',
        headers: {"Authorization":this.token}
      },
      theme: "attachPin",
      hideProgressBar: false,
      hideResetBtn: true,
      hideSelectBtn: false,
      attachPinText: 'Sube tu foto',
      replaceTexts: {
        selectFileBtn: 'Select Files',
        resetBtn: 'Reset',
        uploadBtn: 'Upload',
        dragNDropBox: 'Drag N Drop',
        attachPinBtn: 'Subir imagen',
        afterUploadMsg_success: 'Successfully Uploaded !',
        afterUploadMsg_error: 'Upload Failed !',
        sizeLimit: 'Size Limit'
      }
    };
   }

  ngOnInit(): void {
  }
  onSubmit(form:any): void{
    console.log(this.user);
  }

  avatarUpload(data:any): void {
    let data_obj = data.body;
    console.log(data_obj);

    this.user.image = data_obj.user.image;
    console.log(this.user);
    // if(data.body.status == "success"){
    //   let datos = data.body.image;
    //   this.user.image = datos;
    //   console.log(this.user);
    // }else{
    //   console.log("Error al subir imagen");
    // }
    
  }

}
