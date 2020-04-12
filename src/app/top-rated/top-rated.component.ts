import { Component, OnInit ,OnDestroy} from '@angular/core';
import { RequestApiService } from '../request-api.service'
import { RouterModule } from '@angular/router';
import { Movie } from '../Movie';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-top-rated',
  templateUrl: './top-rated.component.html',
  styleUrls: ['./top-rated.component.css']
})
export class TopRatedComponent implements OnInit ,OnDestroy{
  data: Movie;
  service;
  x:number;
  y:number;
  private destroy$: Subject<void> = new Subject();

  constructor(private pservice: RequestApiService) {
    this.service = pservice;
    this.x = 0;
    this.y = 4;
  }
  ngOnInit() {
    this.service.getTopRatedMovies().pipe(
      takeUntil(this.destroy$)
    ).subscribe((res: Movie) => {
      this.data = res;
    });
  }
  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }
  forward(){
    this.x = this.x + 4;
    this.y = this.y + 4;
  }
  back(){
    this.x = this.x - 4;
    this.y = this.y - 4;
  }
  isInvalid(button:string){
    return (button === "back") ? (this.x == 0) ? true : false : ( this.y ==20 ) ? true : false; 
  }

}
