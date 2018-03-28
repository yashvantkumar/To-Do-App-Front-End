import { Component, OnInit } from '@angular/core';
import { AjaxService } from '../ajax.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private http: AjaxService) { }

  ngOnInit() {
  }

  register(fname,lname,email,phone,password){
    var json = '{\
      "first_name": "'+ fname + '",\
      "last_name": "'+ lname + '",\
      "email": "'+ email + '",\
      "mobile": "'+ phone + '",\
      "password": "'+ password + '"\
    }';
    this.http.postMethod('/signup', json).subscribe(
      (data) => this.registered(data),
      (err) => this.error(err)
    )

  }
  registered(data){
    if(data.status == 200){

    }
  }

  error(err){

  }
}
