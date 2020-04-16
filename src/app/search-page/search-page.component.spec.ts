import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Cast } from '../Cast';
import { Movie } from '../Movie';
import { User } from '../user.model';

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { apiconfig } from '../config';
import { Router } from '@angular/router';
//firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RequestApiService } from '../request-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SearchPageComponent } from './search-page.component';
import { MovieDisplayComponent } from '../movie-display/movie-display.component';


describe('SearchPageComponent', () => {
  let component: SearchPageComponent;
  let fixture: ComponentFixture<SearchPageComponent>;
  let router: Router;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatSelectModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        MatNativeDateModule,
        BrowserModule,
        HttpClientTestingModule,
        FormsModule,
        HttpClientModule,
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireStorageModule,
        RouterTestingModule.withRoutes([
          { path: 'search/:query/:page', component: SearchPageComponent },
          { path: 'movie/:movieID', component: MovieDisplayComponent },
        ]),
        RouterModule.forRoot([
          { path: 'search/:query/:page', component: SearchPageComponent },
          { path: 'movie/:movieID', component: MovieDisplayComponent },
        ])],
      providers: [RequestApiService],
      declarations: [SearchPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
  });
  let test;
  test = {
    "page": 1,
    "results": [
      {
        "adult": false,
        "overview": "Harry Potter has lived under the stairs at his aunt and uncle's house his whole life. But on his 11th birthday, he learns he's a powerful wizard -- with a place waiting for him at the Hogwarts School of Witchcraft and Wizardry. As he learns to harness his newfound powers with the help of the school's kindly headmaster, Harry uncovers the truth about his parents' deaths -- and about the villain who's to blame.",
        "popularity": 86.885,
        "vote_count": 16284,
        "video": false,
        "id": 671,
        "backdrop_path": "/hziiv14OpD73u9gAak4XDDfBKa2.jpg",
        "original_language": "en",
        "original_title": "Harry Potter and the Philosopher's Stone",
        "title": "Harry Potter and the Philosopher's Stone",
        "vote_average": 7.9,
        "release_date": "2001-11-16"
      }
    ],
    "total_results": 1,
    "total_pages": 2
  };
  
  it('should have forward Button', () => {
    component.page = 1;
    component.data = test;
    expect(component.isInvalid('next')).toBeFalsy();
    component.page = 1;
    component.data = test;
    component.data.total_pages = 1;
    expect(component.isInvalid('next')).toBeTruthy();
  });
  it('should have back Button disabled', () => {
    component.page = 1;
    component.data = test;
    expect(component.isInvalid('back')).toBeTruthy();

  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Title Exists.', () => {
    const title = fixture.debugElement.nativeElement.querySelector('#popularTitle');
    expect(title.innerHTML).toBe('Search Results');
  });
});
