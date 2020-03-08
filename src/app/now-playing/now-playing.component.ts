import { Component, OnInit } from '@angular/core';
import {RequestApiService} from '../request-api.service'

import { Movie } from '../Movie';

@Component({
  selector: 'app-now-playing',
  templateUrl: './now-playing.component.html',
  styleUrls: ['./now-playing.component.css']
})
export class NowPlayingComponent implements OnInit {
  data : Movie;
  service;
  constructor(private pservice: RequestApiService ) { 
   this.service = pservice;
  }
  ngOnInit() {
    this.service.getNowPlaying().subscribe((res: Movie) => {
      console.log(res);
      this.data = res;
    });
  }

}
