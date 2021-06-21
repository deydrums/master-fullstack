import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';

@Injectable()

export class UserService {
    public url: string;

    constructor( private _http: HttpClient){
    this.url = global.url;
    }

    register(user: User): Observable<any>{
        //Convertir el objeto del usuario a un JsonString
        let params = JSON.stringify(user);

        //Definir las cabeceras
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        //Hacer peticion ajax
        return this._http.post(this.url + 'register',params,{headers:headers});
    }

    singup(user: any, gettoken:any = null): Observable<any>{
        //Comprobar si llega el gettoken
        if(gettoken != null){
            user.gettoken = gettoken;
        }
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url + 'login', params, {headers:headers});
    }


}
