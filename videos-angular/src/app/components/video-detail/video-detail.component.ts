import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Video } from 'src/app/models/video';
import { Router, ActivatedRoute, Params} from '@angular/router'; 
import { VideoService } from 'src/app/services/video.service';


@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css'],
  providers: [UserService, VideoService]

})
export class VideoDetailComponent implements OnInit {
  public video!: Video;
  public status!: string;
  public message!: string;
  public token!: any;
  public identity!: any;
  public user_id!: any;
  public user!: any;
  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _videoService: VideoService
  ) {
    this.identity = this._userService.getIdentity();
    this.user_id = this.identity.id;
    this.token = this._userService.getToken();
   }

  ngOnInit(): void {
    this.getVideo();
    
  }

  getVideo(){
    this._route.params.subscribe(params =>{
      var id = params['id'];
   
      this._videoService.getVideo(this.token, id).subscribe(
        response => {
          if(response.status == 'success'){
            this.video = response.video;
            this.user = response.video.user;
            console.log(this.video);
          }else{
            console.log(response.message);
          }
        },
        error => {
          console.log(error);
        }
      )
    });

  }

}
