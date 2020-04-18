import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import {RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  constructor(public auth: AuthService) {}
  name = 'ParTV';
}
