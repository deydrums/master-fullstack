import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import {global} from '../../services/global';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {

  public page_title: string;
  public user: User;
  public identity;
  public token;
  public status!: any;

  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.png,jpeg",
    maxSize: 3,
    uploadAPI:  {
      url: global.url+"user/upload",
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

  constructor(private _userService: UserService) { 
    this.page_title = 'Ajustes';
    this.user = new User(1,'','','ROLE_USER','','','','');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    //Rellenar
    this.user = new User(
      this.identity.sub,
      this.identity.name,
      this.identity.surname,
      this.identity.role,
      this.identity.email,'',
      this.identity.description,  
      this.identity.image
    );
  }
    
  ngOnInit(): void {
  }

  onSubmit(form:any){
    this._userService.update(this.token, this.user).subscribe(
      response =>{
        if(response && response.status){
          console.log(response.user);
          this.status = 'success';
          //Actualizar usuario en sesion
          if(response.changes.name){
            this.user.name = response.changes.name;
          }
          if(response.changes.surname){
            this.user.surname = response.changes.surname;
          }
          if(response.changes.email){
            this.user.email = response.changes.email;
          }
          if(response.changes.description){
            this.user.description = response.changes.description;
          }
          if(response.changes.image){
            this.user.image = response.changes.image;
          }
          //Actualizar usuario en el local storage
          this.identity = this.user;
          localStorage.setItem('identity',JSON.stringify(this.identity));
        }else{
          this.status = 'error';
        }
        
      },
      error =>{
        this.status = 'error';
        console.log(<any>error);
      }
    );

  }

  avatarUpload(datos:any){
    if(datos.status == 400){
      console.log(datos.error);
    }else if(datos.status == 200){
      console.log(datos.body);
      let data = datos.body.image;
      this.user.image = data;
   
    }
  }

}
