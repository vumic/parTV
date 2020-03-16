import { Component, OnInit } from '@angular/core';
import {RequestApiService} from '../request-api.service'

import { Genres } from '../Genres';
@Component({
  selector: 'app-random-movie',
  templateUrl: './random-movie.component.html',
  styleUrls: ['./random-movie.component.css']
})
export class RandomMovieComponent implements OnInit {
  service;
  data : Genres;
  constructor(private pservice: RequestApiService) {
    this.service = pservice;
   }
    
  ngOnInit() {
    this.service.getGenres().subscribe((res: Genres) => {
      console.log(res);
      this.data = res;
    });
  }

}
