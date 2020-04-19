import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RequestApiService } from '../request-api.service';
import { AuthService } from '../auth.service';
import { FirebaseApp, } from '@angular/fire';
import { Cast } from '../Cast';
import { Movie } from '../Movie';
import { User } from '../user.model';
import { Subscription } from 'rxjs';


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
  user: User;
  hidden: boolean;

  subscription : Subscription;
  constructor(private route: ActivatedRoute, private service: RequestApiService, public auth: AuthService, private FirebaseApp: FirebaseApp, ) {
    this.pservice = service;
    this.movieAdded = false;
    this.hidden = true;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.movie = params.get('movieID');
      this.isMovieAdded();
      setTimeout(() => (this.movieAdded = this.auth.u), 600);
      this.pservice.getMovie(this.movie).subscribe((res: Movie) => {
        this.data = res;
        for (let i = 0; i < this.data.genres.length; i++) {
          (i == this.data.genres.length-1 ) ? this.genres += this.data.genres[i].name + " " : this.genres += this.data.genres[i].name + ", "
        }
      });
      this.pservice.getCast(this.movie).subscribe((res: Cast) => {
        this.cast = res;
      });
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  /**
   * Makes sure your movie is added if youre logged in.
   */
  async isMovieAdded() {
    this.subscription = this.auth.user$.subscribe(async (user) => {
      if (user) {
        this.user = user;
        this.auth.isInWatchlist(this.movie, this.user.uid);
        setTimeout(() => (this.movieAdded = this.auth.u, this.hidden = false), 400);
      }
    });
    this.movieAdded = this.auth.u;
  };
  /**
   * Adds current movie in your WL & its not added. if youre logged in.
   */
  addToWatchlist() {
    this.auth.addToWatchlist(this.movie, this.data);
    this.movieAdded = true;
  }
  /**
   * Adds current movie in your WL & its not added. if youre logged in.
   */
  deleteFromWatchlist() {
    this.auth.deleteFromWatchlist(this.movie);
    this.movieAdded = false;
  }

}
