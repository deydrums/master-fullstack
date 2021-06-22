import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Topic } from '../models/topic';
import { global } from './global';

@Injectable()

export class TopicService {
    public url: string;
    public identity: any;
    public token: any;
    constructor( private _http: HttpClient){
    this.url = global.url;
    }

    addTopic(token:any,topic:any): Observable<any>{
        let params = JSON.stringify(topic);
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set("Authorization",token);
        return this._http.post(this.url+'topic', params, {headers:headers});
    }

    getTopicsByUser(userId:any): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'user-topics/'+userId, {headers:headers}); 
    }

    getTopic(id: string): Observable<any>{
        return this._http.get(this.url+'topic/'+id);
    }

}
