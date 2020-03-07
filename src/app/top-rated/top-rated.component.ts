import { Component, OnInit } from '@angular/core';
import {RequestApiService} from '../request-api.service'

@Component({
  selector: 'app-top-rated',
  templateUrl: './top-rated.component.html',
  styleUrls: ['./top-rated.component.css']
})
export class TopRatedComponent implements OnInit {
data;
  constructor(private service: RequestApiService ) { 
    service.getTopRatedMovies().subscribe((res: Response) => {
        console.log(res);
        this.data = res;
      });
  }
  ngOnInit() {
  }

}
