import { Component, OnInit } from '@angular/core';
import {RequestApiService} from '../request-api.service'
import { Router} from '@angular/router';

import { Genres } from '../Genres';
import { Movie } from '../Movie';
import { MatSelectChange } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
@Component({
  selector: 'app-random-movie',
  templateUrl: './random-movie.component.html',
  styleUrls: ['./random-movie.component.css']
})
export class RandomMovieComponent implements OnInit {
  service;
  data : Genres;
  chosenGenre : number;
  movies : Movie;
  constructor(private pservice: RequestApiService,private router: Router,) {
    this.service = pservice;
    this.chosenGenre = 0;
   }
    
  ngOnInit() {
    this.service.getGenres().subscribe((res: Genres) => {
      console.log(res);
      this.data = res;
    });
  }
  selectedGenre(event: MatSelectChange){
    const selectedData = {
      text: (event.source.selected as MatOption).viewValue,
      value: event.source.value
    };
    if (selectedData.value > 0){
      this.chosenGenre = selectedData.value;
    }
  }
  getMovie(){
  this.service.discover(this.chosenGenre).subscribe((res: Movie) => {
    this.movies = res;
    let randomNum = Math.floor(Math.random() * 20);
    let id = 0;
    id = this.movies.results[randomNum].id;
    this.router.navigate(['/movie/', id]);
  });
  

}

}
