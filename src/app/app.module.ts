import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AjaxService } from './ajax.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { CookieService }  from 'angular2-cookie/core';
import { AuthServiceService } from './auth-service.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterializeModule,
    HttpModule,
    FormsModule
  ],
  providers: [AjaxService, CookieService, AuthServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
