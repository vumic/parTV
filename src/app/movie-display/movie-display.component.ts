import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestApiService } from '../request-api.service';
import { AuthService } from '../auth.service';
import { FirebaseApp, } from '@angular/fire';
import { Cast } from '../Cast';
import { Movie } from '../Movie';

import { User } from '../user.model';
import { flatMap } from 'rxjs/operators';



@Component({
  selector: 'app-movie-display',
  templateUrl: './movie-display.component.html',
  styleUrls: ['./movie-display.component.css']
})
export class MovieDisplayComponent implements OnInit {
  movie: string;
  data: Movie;
  pservice;
  cast: Cast;
  genres = '';
  movieAdded;
  doit: boolean;
  well;
  user: User;
  d: MovieDisplayComponent;
  subscription;
  constructor(private route: ActivatedRoute, private service: RequestApiService, public auth: AuthService, private FirebaseApp: FirebaseApp, ) {
    this.pservice = service;
    this.movieAdded = false;
    this.doit = false;
    this.well = null;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.movie = params.get('movieID');
      console.log(this.movie);

      this.pservice.getMovie(this.movie).subscribe((res: Movie) => {
        this.data = res;
        console.log("Movie: " + this.data);

        for (let i = 0; i < this.data.genres.length; i++) {
          this.genres += this.data.genres[i].name + " ";
        }
      });
      this.pservice.getCast(this.movie).subscribe((res: Cast) => {
        console.log("Cast: " + res);
        this.cast = res;
      });
      this.isMovieAdded();
      this.movieAdded = this.auth.u;
      console.log(this.movieAdded);
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async isMovieAdded() {
     this.subscription =  this.auth.user$.subscribe(async (user) => {
      this.user = user;
       this.auth.isInWatchlist(this.movie, user.uid);
       setTimeout(() => this.movieAdded = this.auth.u, 200);
    });
  };


  addToWatchlist() {
   
    this.auth.addToWatchlist(this.movie);
    this.movieAdded = true;
  }

  deleteFromWatchlist() {

    this.auth.deleteFromWatchlist(this.movie);
    this.movieAdded = false;
  }

}
