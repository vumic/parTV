import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Movie } from './Movie';
import { Cast } from './Cast';
import { Genres } from './Genres';
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable()
export class RequestApiService {
  private key = "?api_key=27220e51c0eaac440a67a9605a63827a";
  private url = "https://api.themoviedb.org/3/";

  //calls to tMDB API.

  constructor(private http: HttpClient) { }
  getPopularMovies(): Observable<Movie[]> {
    return this.http.get(this.url + 'trending/movie/week' + this.key).pipe(
      map((response: Movie[]) => response as Movie[]), catchError(error => {
        return throwError('yikes do more error stuff');
      })
    );
  }
  getTopRatedMovies(): Observable<Movie[]> {
    return this.http.get(this.url + 'movie/top_rated' + this.key + '&language=en-US&page=1&region=US').pipe(
      map((response: Movie[]) => response as Movie[]), catchError(error => {
        return throwError('yikes do more error stuff');
      })
    );
  }
  getNowPlaying(): Observable<Movie[]> {
    return this.http.get(this.url + 'movie/now_playing' + this.key + '&language=en-US&page=1&region=US').pipe(
      map((response: Movie[]) => response as Movie[]), catchError(error => {
        return throwError('yikes do more error stuff');
      })
    );
  }
  getMovie(id: number): Observable<Movie[]> {
    return this.http.get(this.url + 'movie/' + id + this.key + '&language=en-US').pipe(
      map((response: Movie[]) => response as Movie[]), catchError(error => {
        return throwError('yikes do more error stuff');
      })
    );
  }
  getCast(id: number): Observable<Cast[]> {
    return this.http.get(this.url + 'movie/' + id + '/credits' + this.key).pipe(
      map((response: Cast[]) => response as Cast[]), catchError(error => {
        return throwError('yikes do more error stuff');
      })
    );
  }
  getGenres(): Observable<Genres[]> {
    return this.http.get(this.url + 'genre/movie/list' + this.key + '&language=en-US').pipe(
      map((response: Genres[]) => response as Genres[]), catchError(error => {
        return throwError('yikes do more error stuff');
      })
    );
  }
  searchQuery(query: string, page: number): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.url + 'search/movie' + this.key + '&language=en-US&query=' + query + '&page=' + page + '&include_adult=false').pipe(
      map((response: Movie[]) => response as Movie[]), catchError(error => {
        return throwError('yikes do more error stuff');
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
        return throwError('yikes do more error stuff');
      })
    );

  }
}
