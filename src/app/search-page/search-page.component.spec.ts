import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Cast } from '../Cast';
import { Movie } from '../Movie';
import { User } from '../user.model';

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

//firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RequestApiService } from '../request-api.service';

import { SearchPageComponent } from './search-page.component';
import { MovieDisplayComponent } from '../movie-display/movie-display.component';


describe('SearchPageComponent', () => {
  let component: SearchPageComponent;
  let fixture: ComponentFixture<SearchPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({imports: [MatSelectModule,
      MatFormFieldModule,
      BrowserAnimationsModule,
      MatNativeDateModule,
      BrowserModule,
      FormsModule,
      HttpClientModule,
      AngularFirestoreModule,
      AngularFireAuthModule,
      AngularFireStorageModule,
      RouterModule.forRoot([
        { path: 'search/:query/:page', component: SearchPageComponent },
     
          { path: 'movie/:movieID', component: MovieDisplayComponent },
     
      ])],
    providers: [RequestApiService],
      declarations: [ SearchPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
