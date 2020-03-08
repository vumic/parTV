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
  constructor(private pservice: RequestApiService ) { 
    this.service = pservice; 
  }

  ngOnInit() {
    this.service.getPopularMovies().subscribe((res: Movie) => {
      console.log(res);
      this.data = res;
    });
  }
  
}