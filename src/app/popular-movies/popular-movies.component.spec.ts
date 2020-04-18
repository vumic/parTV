import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { config } from '../../config';
import { apiconfig } from '../config';
//firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { RequestApiService } from '../request-api.service';
import { PopularMoviesComponent } from './popular-movies.component';
import { RouterModule } from '@angular/router';
import { MovieDisplayComponent } from '../movie-display/movie-display.component';

describe('PopularMoviesComponent', () => {
  let component: PopularMoviesComponent;
  let fixture: ComponentFixture<PopularMoviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularMoviesComponent ] ,
      imports: [MatSelectModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        MatNativeDateModule,
        BrowserModule,
        FormsModule,
     
        HttpClientModule,
        AngularFireModule.initializeApp(config),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireStorageModule,
        RouterModule.forRoot([
          { path: 'movie/:movieID', component: MovieDisplayComponent },
        ])],
      providers: [RequestApiService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Movie data should be undefined before request.', () => {
    expect(component.data).toBe(undefined);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have forward Button', () => {
    const btn = fixture.debugElement.nativeElement.querySelector('#forward');
    expect(btn.innerHTML).toBe('&gt;');
    expect(btn.disabled).toBeFalsy();
  });
  it('should have back Button', () => {
    const btn = fixture.debugElement.nativeElement.querySelector('#back');
    expect(btn.innerHTML).toBe('&lt;');
    expect(btn.disabled).toBeTruthy();
  });
  it('forward called', async(() => {
    spyOn(component, 'forward');
  
    let button = fixture.debugElement.nativeElement.querySelector('#forward');
    button.click();
  
    fixture.whenStable().then(() => {
      expect(component.forward).toHaveBeenCalled();
    });
  }));
 
  it('Check indexes', () => {
    const btn = fixture.debugElement.nativeElement.querySelector('#back');
    const fbtn = fixture.debugElement.nativeElement.querySelector('#forward');
    expect(btn.disabled).toBeTruthy();
    fbtn.click();
    expect(component.x).toBe(4);
    expect(component.y).toBe(8);
  });
  it('Popular Title Exists.', () => {
    const title = fixture.debugElement.nativeElement.querySelector('#popularTitle');
    expect(title.innerHTML).toBe('TRENDING MOVIES OF THE WEEK');
  });
});
