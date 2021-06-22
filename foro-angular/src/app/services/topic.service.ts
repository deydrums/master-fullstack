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





    test(){
        return "Topic Service";
    }

}
