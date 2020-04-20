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
  private key = '?api_key=27220e51c0eaac440a67a9605a63827a';
  private url = "https://api.themoviedb.org/3/";

  //calls to tMDB API.

  constructor(private http: HttpClient) { }

  /**tMDB returns top 20 trending movies according to their data.. This is called in HOME_PAGE*/

  getPopularMovies(): Observable<Movie[]> {
    return this.http.get(this.url + 'trending/movie/week' + this.key).pipe(
      map((response: Movie[]) => response as Movie[]), catchError(error => {
        throw new Error('Value expected!');
      })
    );
  }

  /**tMDB returns top 20 rated according to their data.. This is called in HOME_PAGE*/

  getTopRatedMovies(): Observable<Movie[]> {
    return this.http.get(this.url + 'movie/top_rated' + this.key + '&language=en-US&page=1&region=US').pipe(
      map((response: Movie[]) => response as Movie[]), catchError(error => {
        throw new Error('Value expected!');
      })
    );
  }

  /**tMDB returns top 20 now playing according to their data.. This is called in HOME_PAGE*/

  getNowPlaying(): Observable<Movie[]> {
    return this.http.get(this.url + 'movie/now_playing' + this.key + '&language=en-US&page=1&region=US').pipe(
      map((response: Movie[]) => response as Movie[]), catchError(error => {
        throw new Error('Value expected!');
      })
    );
  }

  /**tMDB returns movie information. This is called in MOVIE_PAGE*/

  getMovie(id: number): Observable<Movie[]> {
    return this.http.get(this.url + 'movie/' + id + this.key + '&language=en-US').pipe(
      map((response: Movie[]) => response as Movie[]), catchError(error => {
        throw new Error('Value expected!');
      })
    );
  }

  /**tMDB returns cast list in json form. This is called in MOVIE_PAGE*/

  getCast(id: number): Observable<Cast[]> {
    return this.http.get(this.url + 'movie/' + id + '/credits' + this.key).pipe(
      map((response: Cast[]) => response as Cast[]), catchError(error => {
        throw new Error('Value expected!');
      })
    );
  }

  /**tMDB stores genres with IDS. This will send a json that will show what genres
   * match what ID. */

  getGenres(): Observable<Genres[]> {
    return this.http.get(this.url + 'genre/movie/list' + this.key + '&language=en-US').pipe(
      map((response: Genres[]) => response as Genres[]), catchError(error => {
        throw new Error('Value expected!');
      })
    );
  }

  /**tMDB searches your query. returns json of movies and pages. Button navigates between
   * pages inside of SEARCH_PAGE.*/
  
  searchQuery(query: string, page: number): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.url + 'search/movie' + this.key + '&language=en-US&query=' + query + '&page=' + page + '&include_adult=false').pipe(
      map((response: Movie[]) => response as Movie[]), catchError(error => {
        throw new Error('Value expected!');
      })
    );
  }
  
/** Gets the top 50 pages for each movie genre ( each movie page will return 20 movies.)
 * So in total, you will be picking 1/1000 movies for a "random movie".               */

  discover(genreID: number, max:number): Observable<Movie[]> {
    let name = "";
    let randomNum = Math.floor(Math.random() * max) + 1;
    if (genreID > 0) {
        name = "&with_genres=" + genreID;
    } return this.http.get<Movie[]>(this.url + 'discover/movie' + this.key + '&language=en-US &sort_by=popularity.desc&include_adult=false&include_video=false&page='+randomNum + name).pipe(
      map((response: Movie[]) => response as Movie[]), catchError(error => {
        throw new Error('Value expected!');
      })
    );

  }
}
