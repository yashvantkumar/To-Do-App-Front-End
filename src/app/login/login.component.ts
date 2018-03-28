import { Component, OnInit } from '@angular/core';
import { AjaxService } from '.././ajax.service'
import { Router } from '@angular/router';
import { CookieService }  from 'angular2-cookie/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = new Array();
  constructor(private ajax: AjaxService, private router: Router, private cookie: CookieService) { }

  ngOnInit() {
  }

  loginRoute() {
      
  }

  login(email,password) {
    var json = '{\
      "email": "'+ email + '",\
      "password": "'+ password + '"\
    \}';
    this.ajax.postMethod('/login', json).subscribe(
      (data) => {
        this.loggedIn(data)
      },
      (err) => this.error(err)
    )
  }

  loggedIn(data){
    if(data.status == 200){
      this.cookie.put('token', data.token)
      this.user.push(data)
      this.router.navigateByUrl('/home');    
    }
  }

  error(err){

  }

}
