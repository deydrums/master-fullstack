import { Component, OnInit, DoCheck} from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService, VideoService]
})
export class HomeComponent implements OnInit, DoCheck {
  public page_title: string;
  public identity!:any;
  public token!:any;
  public videos: any;
  constructor(
    private _userService: UserService,
    private _videoService: VideoService
  ) { 
    this.page_title = "Inicio";
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this.getVideos();
  }

  ngDoCheck(){
    this.loadUser();
  }

  loadUser(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  getVideos(){
    this._videoService.getVideos(this.token).subscribe(
      response =>{
        if(response.status == 'success'){
          this.videos = response.videos;
          //console.log(this.videos);
        }else{
          console.log(response.message);
        }
      },
      error =>{
        console.log(error);
      }
    );
  }

   getThumb(url:any, size:any = null) {
        var video, results, thumburl;
        
        if (url === null) {
            return '';
        }
        
        results = url.match('[\\?&]v=([^&#]*)');
        video   = (results === null) ? url : results[1];
        
        if(size != null) {
            thumburl = 'http://img.youtube.com/vi/' + video + '/'+ size +'.jpg';
        }else{
            thumburl = 'http://img.youtube.com/vi/' + video + '/mqdefault.jpg';
        }
        
          return thumburl;
        
    }

    
  removeVideo(id:any){
    this._videoService.delete(this.token,id).subscribe(
      response =>{
        if(response.status == 'success'){
          this.getVideos();
        }else{
          console.log(response.error);
        }
      },
      error =>{
        console.log(error);
      }
    )
  }
}
