import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestApiService } from '../request-api.service';


@Component({
  selector: 'app-movie-display',
  templateUrl: './movie-display.component.html',
  styleUrls: ['./movie-display.component.css']
})
export class MovieDisplayComponent implements OnInit {
  movie;
  data;
  pservice;
  cast;
  constructor( private route: ActivatedRoute, private service: RequestApiService) {
    this.pservice = service;
    
   }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.movie = params.get('movieID');
      console.log(this.movie);
      this.pservice.getMovie(this.movie).subscribe((res: Response) => {
        this.data = res;
      });
      this.pservice.getCast(this.movie).subscribe((res: Response) => {
        console.log(res);
        this.cast = res;
       
      });
    });
  }
 
}
