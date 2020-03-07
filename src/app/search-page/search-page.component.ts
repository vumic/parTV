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
page;

constructor( private route: ActivatedRoute, private service: RequestApiService) {
  this.pservice = service;
  
 }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.query = params.get('query');
      this.page = params.get('page');
      console.log(this.query);
      console.log("page: " + this.page);
      this.pservice.searchQuery(this.query, this.page).subscribe((res: Response) => {
        this.data = res;
        console.log(this.data);
      });
    
    });
  }

  nextPage(){
    if(this.page < this.data.total_pages){
      window.location.href = "/search/" + this.query + "/" + ++this.page;  
    }
    else{
      window.alert("No more pages");
    }
  }
  
}
