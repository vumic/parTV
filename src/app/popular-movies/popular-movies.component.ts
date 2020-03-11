import { Component, OnInit } from '@angular/core';
import {RequestApiService} from '../request-api.service'

import { Movie } from '../Movie';

@Component({
  selector: 'app-popular-movies',
  templateUrl: './popular-movies.component.html',
  styleUrls: ['./popular-movies.component.css']
})
export class PopularMoviesComponent implements OnInit {
  data : Movie;
  service;
  x:number;
  y:number;
  constructor(private pservice: RequestApiService ) { 
    this.service = pservice; 
    this.x = 0;
    this.y = 5;
  }

  ngOnInit() {
    this.service.getPopularMovies().subscribe((res: Movie) => {
      console.log(res);
      this.data = res;
    });
  }
  forward(){
    this.x = this.x + 5;
    this.y = this.y + 5;
  }
  back(){
    this.x = this.x - 5;
    this.y = this.y - 5;
  }
  isInvalid(button:string){
    return (button === "back") ? (this.x == 0) ? true : false : ( this.y ==20 ) ? true : false; 
  }
}