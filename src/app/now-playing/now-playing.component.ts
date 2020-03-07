import { Component, OnInit } from '@angular/core';
import {RequestApiService} from '../request-api.service'

@Component({
  selector: 'app-now-playing',
  templateUrl: './now-playing.component.html',
  styleUrls: ['./now-playing.component.css']
})
export class NowPlayingComponent implements OnInit {
  data;
  
  constructor(private service: RequestApiService ) { 
    service.getNowPlaying().subscribe((res: Response) => {
        console.log(res);
        this.data = res;
      });
  }
  ngOnInit() {
  }

}
