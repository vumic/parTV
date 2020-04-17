import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Movie } from './Movie';
import { Cast } from './Cast';
import { Genres } from './Genres';
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { config } from '../config';
@Injectable()
export class RequestApiService {
  private key = config.MY_KEY;
  private url = "https://api.themoviedb.org/3/";

  //calls to tMDB API.

  constructor(private http: HttpClient) { }
  getPopularMovies(): Observable<Movie[]> {
    return this.http.get(this.url + 'trending/movie/week' + this.key).pipe(
      map((response: Movie[]) => response as Movie[]), catchError(error => {
        throw new Error('Value expected!');
      })
    );
  }
  getTopRatedMovies(): Observable<Movie[]> {
    return this.http.get(this.url + 'movie/top_rated' + this.key + '&language=en-US&page=1&region=US').pipe(
      map((response: Movie[]) => response as Movie[]), catchError(error => {
        throw new Error('Value expected!');
      })
    );
  }
  getNowPlaying(): Observable<Movie[]> {
    return this.http.get(this.url + 'movie/now_playing' + this.key + '&language=en-US&page=1&region=US').pipe(
      map((response: Movie[]) => response as Movie[]), catchError(error => {
        throw new Error('Value expected!');
      })
    );
  }
  getMovie(id: number): Observable<Movie[]> {
    return this.http.get(this.url + 'movie/' + id + this.key + '&language=en-US').pipe(
      map((response: Movie[]) => response as Movie[]), catchError(error => {
        throw new Error('Value expected!');
      })
    );
  }
  getCast(id: number): Observable<Cast[]> {
    return this.http.get(this.url + 'movie/' + id + '/credits' + this.key).pipe(
      map((response: Cast[]) => response as Cast[]), catchError(error => {
        throw new Error('Value expected!');
      })
    );
  }
  getGenres(): Observable<Genres[]> {
    return this.http.get(this.url + 'genre/movie/list' + this.key + '&language=en-US').pipe(
      map((response: Genres[]) => response as Genres[]), catchError(error => {
        throw new Error('Value expected!');
      })
    );
  }
  searchQuery(query: string, page: number): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.url + 'search/movie' + this.key + '&language=en-US&query=' + query + '&page=' + page + '&include_adult=false').pipe(
      map((response: Movie[]) => response as Movie[]), catchError(error => {
        throw new Error('Value expected!');
      })
    );
  }

  discover(genreID: number): Observable<Movie[]> {
    let name = "";
    let randomNum = Math.floor(Math.random() * 50) + 1;
    if (genreID > 0) {
        name = "&with_genres=" + genreID;
    } return this.http.get<Movie[]>(this.url + 'discover/movie' + this.key + '&language=en-US &sort_by=popularity.desc&include_adult=false&include_video=false&page='+randomNum + name).pipe(
      map((response: Movie[]) => response as Movie[]), catchError(error => {
        throw new Error('Value expected!');
      })
    );

  }
}
