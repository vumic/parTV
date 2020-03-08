import { Component, OnInit } from '@angular/core';
import {RequestApiService} from '../request-api.service'

import { Movie } from '../Movie';

@Component({
  selector: 'app-top-rated',
  templateUrl: './top-rated.component.html',
  styleUrls: ['./top-rated.component.css']
})
export class TopRatedComponent implements OnInit {
data : Movie;
service;
  constructor(private pservice: RequestApiService ) { 
  this.service = pservice;
  }
  ngOnInit() {
    this.service.getTopRatedMovies().subscribe((res: Movie) => {
      console.log(res);
      this.data = res;
    });
  }

}
