import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Cast } from '../Cast';
import { Movie } from '../Movie';
import { User } from '../user.model';

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
//firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RequestApiService } from '../request-api.service';

import { RandomMovieComponent } from './random-movie.component';
import { MovieDisplayComponent } from '../movie-display/movie-display.component';

describe('RandomMovieComponent', () => {
  let component: RandomMovieComponent;
  let fixture: ComponentFixture<RandomMovieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatSelectModule,
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
          { path: 'movie/:movieID', component: MovieDisplayComponent },
        ])],
      providers: [RequestApiService],
      declarations: [RandomMovieComponent, MovieDisplayComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Title Exists.', () => {
    const title = fixture.debugElement.nativeElement.querySelector('#title');
    expect(title.innerHTML).toBe('Randomize a movie');
  });
 
  it('should have a title', () => {
    const title = fixture.debugElement.query(By.css('mat-label')).nativeElement;
    expect(title.innerHTML).toBe('Choose Genre');
  });
  it('randomize button has correct text', () => {
    const btn = fixture.debugElement.nativeElement.querySelector('#rBut');
    expect(btn.innerHTML).toBe('Randomize');
  });

  it('enabled randomize button', () => {
    const btn = fixture.debugElement.nativeElement.querySelector('#rBut');
    expect(btn.disabled).toBeFalsy();
  });
  it('getMovie Called after random Button', async(() => {
    spyOn(component, 'getMovie');
 
    let button = fixture.debugElement.nativeElement.querySelector('#rBut');
    button.click();
  
    fixture.whenStable().then(() => {
      expect(component.getMovie).toHaveBeenCalled();
    });
  }));
});
