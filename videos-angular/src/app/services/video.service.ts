import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';
import { Video } from '../models/video';

@Injectable()

export class VideoService {

    public url: string;
    public identity!: any;
    public token!: any;

    constructor(public _http: HttpClient){
        this.url = global.url;
    }
    test(){
        return "Hola mundo desde un servicio";
    }

    create(video:any, token:any):Observable<any>{
        let json = JSON.stringify(video);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);
        return this._http.post(this.url+'video/new',params,{headers:headers});
    }
    
    getVideos(token:any):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);
        return this._http.get(this.url+'video/list',{headers:headers});
    }

    getVideo(token:any, id:any):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);
        return this._http.get(this.url+'video/detail/'+id,{headers:headers});
    }

    update(token:any, video:any, id:any):Observable<any>{
        let json = JSON.stringify(video);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);
        return this._http.put(this.url+'video/edit/'+id,params,{headers:headers});
    }

    delete(token:any, id:any):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);
        return this._http.delete(this.url+'video/remove/'+id,{headers:headers});
    }


}