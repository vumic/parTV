import { Component, OnInit } from '@angular/core';
import {RequestApiService} from '../request-api.service'

@Component({
  selector: 'app-popular-movies',
  templateUrl: './popular-movies.component.html',
  styleUrls: ['./popular-movies.component.css']
})
export class PopularMoviesComponent implements OnInit {
  data;
  
  constructor(private service: RequestApiService ) { 
    service.getPopularMovies().subscribe((res: Response) => {
        console.log(res);
        this.data = res;
      });
  }

  ngOnInit() {
  }
  
}