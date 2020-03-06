import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestApiService } from '../request-api.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
query;
pservice;
data;
constructor( private route: ActivatedRoute, private service: RequestApiService) {
  this.pservice = service;
  
 }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.query = params.get('query');
      console.log(this.query);
      this.pservice.searchQuery(this.query).subscribe((res: Response) => {
        this.data = res;
        console.log(this.data);
      });
    
    });
  }
  
}
