import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CookieService }  from 'angular2-cookie/core';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

@Injectable()
export class AjaxService {
  private ACCESS_TOKEN: string;
  private API_URL: string = "http://localhost:3000/api/todo";
  headers: Headers = new Headers();
  constructor(private http: Http, private cookie: CookieService) { }
  
  getMethod(path: string) {
    this.headers = new Headers();
    this.ACCESS_TOKEN = 'JWT '+this.cookie.get('token');
    this.headers.append("Content-Type", "application/json");    
    this.headers.append("Authorization", this.ACCESS_TOKEN)
    return this.http.get(this.API_URL + path, { headers: this.headers })
      .map((res) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  postMethod(path: string, data: any) {
    this.ACCESS_TOKEN = 'JWT ' + this.cookie.get('token');
    this.headers = new Headers();
    this.headers.append("Authorization", this.ACCESS_TOKEN)    
    this.headers.append("Content-Type", "application/json");
    return this.http.post(this.API_URL + path, data, { headers: this.headers })
      .map((res) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  deleteMethod(path: string) {
    this.ACCESS_TOKEN = 'JWT ' + this.cookie.get('token');
    this.headers = new Headers();
    this.headers.append("Authorization", this.ACCESS_TOKEN)    
    this.headers.append("Content-Type", "application/json");
    return this.http.delete(this.API_URL + path, { headers: this.headers})
      .map((res) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));;
  }
}