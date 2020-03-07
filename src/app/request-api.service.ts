import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class RequestApiService {
  private key = "?api_key=27220e51c0eaac440a67a9605a63827a";
  private url = "https://api.themoviedb.org/3/";

  //calls to tMDB API.
  
  constructor(private http: HttpClient) {}
  getPopularMovies() {
    return this.http.get(this.url + 'trending/movie/week' + this.key);
  }
  getTopRatedMovies(){
    return this.http.get(this.url + 'movie/top_rated' + this.key+ '&language=en-US&page=1&region=US');
  }
  getNowPlaying(){
    return this.http.get(this.url + 'movie/now_playing' + this.key+ '&language=en-US&page=1&region=US');
  }
  getMovie(id){
    return this.http.get(this.url + 'movie/'+ id + this.key + '&language=en-US');
  }
  getCast(id){
    return this.http.get(this.url + 'movie/' + id + '/credits' + this.key);
  }
  searchQuery(query,page){
    return this.http.get(this.url + 'search/movie' + this.key + '&language=en-US&query=' + query +'&page='+page+'&include_adult=false');
  }
}
