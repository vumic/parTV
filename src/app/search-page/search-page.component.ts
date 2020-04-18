import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router ,RouterModule} from '@angular/router';

import { Movie } from '../Movie';
import { RequestApiService } from '../request-api.service';
@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  query: string;
  pservice;
  data: Movie;
  page;

  constructor(private router: Router, private route: ActivatedRoute, private service: RequestApiService) {
    this.pservice = service;

  }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.query = params.get('query');
      this.page = params.get('page');

      this.pservice.searchQuery(this.query, this.page).subscribe((res: Movie) => {
        this.data = res;
      });
    });
  }
  /**
   * Changes the page in the http call to tmdb
   */
  nextPage() {
    if (this.page < this.data.total_pages) {
      this.router.navigate(['/search/', this.query, ++this.page]);
    }
  }

  /**
   * Changes the page in the http call to tmdb
   */
  backPage() {
    if (this.page > 1) {
      this.router.navigate(['/search/', this.query, --this.page]);
    }
  }

  /**
   * Checking whether the button is invalid or not
   * @param button either back or next button.
   */
  isInvalid(button : string) {
   return (button === "back") ? (this.page == 1) ? true : false : (this.page == this.data.total_pages ) ? true : false; 
  }
}
