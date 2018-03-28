import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable, Observer, Subject} from 'rxjs/Rx';
import { AjaxService } from './ajax.service';
import { CookieService } from 'angular2-cookie/core';

@Injectable()
export class AuthServiceService implements CanActivate {

    constructor(private cookie: CookieService, private router: Router){ }

    canActivate(): boolean {
        // console.log(this.cookie.get('token'))
        if(this.cookie.get('token')){
            // this.router.navigateByUrl('/home');
            return true;
        } else {
            this.router.navigateByUrl('/login');
            return false;
        }
    }

}
