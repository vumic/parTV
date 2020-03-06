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
  getMovie(id){
    return this.http.get(this.url + 'movie/'+ id + this.key + '&language=en-US');
  }
  getCast(id){
    return this.http.get(this.url + 'movie/' + id + '/credits' + this.key);
  }
  searchQuery(query){
    return this.http.get(this.url + 'search/movie' + this.key + '&language=en-US&query=' + query +'&page=1&include_adult=false');
  }
}
