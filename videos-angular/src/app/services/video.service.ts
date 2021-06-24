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
}