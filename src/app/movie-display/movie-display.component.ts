import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestApiService } from '../request-api.service';

import { Cast } from '../Cast';
import { Movie } from '../Movie';

@Component({
  selector: 'app-movie-display',
  templateUrl: './movie-display.component.html',
  styleUrls: ['./movie-display.component.css']
})
export class MovieDisplayComponent implements OnInit {
  movie;
  data : Movie;
  pservice;
  cast : Cast;
  genres = '';
  constructor( private route: ActivatedRoute, private service: RequestApiService) {
    this.pservice = service;
    
   }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.movie = params.get('movieID');
      console.log(this.movie);
      this.pservice.getMovie(this.movie).subscribe((res: Movie) => {
        this.data = res;
        console.log ("Movie: " + this.data);

        for (let i = 0; i < this.data.genres.length; i++) {
            this.genres += this.data.genres[i].name + " ";
        }
      });
      this.pservice.getCast(this.movie).subscribe((res: Cast) => {
        console.log("Cast: " + res);
        this.cast = res;
       
      });
    });
  }
 
}
