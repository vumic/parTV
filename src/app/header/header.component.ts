import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  doc;
  constructor(@Inject(DOCUMENT) document) {
    this.doc = document;

  }

  ngOnInit() {
  }

  search() {
    var keyword = this.doc.getElementById("textbox").value;
    window.location.href = "/search/" + keyword + "/1";  
  }
}