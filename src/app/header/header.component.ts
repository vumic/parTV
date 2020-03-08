import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  keyword: string;
  constructor(private router: Router, ) {
  }

  ngOnInit() {
  }

  search() {
    this.router.navigate(['/search/', this.keyword, 1]);
  }
}