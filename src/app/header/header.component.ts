import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  keyword: string;
  constructor(private router: Router, public auth: AuthService) {
  }

  ngOnInit() {
  }

  search() {
    this.router.navigate(['/search/', this.keyword, 1]);
  }
}