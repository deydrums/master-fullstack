import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Video } from 'src/app/models/video';
import { Router, ActivatedRoute, Params} from '@angular/router'; 
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-video-new',
  templateUrl: './video-new.component.html',
  styleUrls: ['./video-new.component.css'],
  providers: [UserService, VideoService]
})
export class VideoNewComponent implements OnInit {
  public page_title !: string;
  public video: Video;
  public status!: string;
  public message!: string;
  public token!: any;
  public identity!: any;
  public user_id!: any;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _videoService: VideoService
  ) {
    this.page_title = "Crear nuevo video";
    this.identity = this._userService.getIdentity();
    this.user_id = this.identity.id;
    this.token = this._userService.getToken();
    this.video = new Video(1,this.user_id,'','','','','','');
   }

  ngOnInit(): void {
  }
  

  onSubmit(form:any){
    this._videoService.create(this.video, this.token).subscribe(
      response => {
        if(response.status == 'success'){
          this.message = response.message;
          this.status = response.status;
        }else{
          this.message = response.message;
          this.status = response.status;
        }
      },
      error => {
        console.log(<any>error);
        this.message = 'Ha ocurrido un error, intenta de nuevo';
        this.status = 'error';
      }
    )
  }

}
