import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { config } from '../../config';

//firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { RequestApiService } from '../request-api.service';

import { TopRatedComponent } from './top-rated.component';
import { RouterModule } from '@angular/router';
import { MovieDisplayComponent } from '../movie-display/movie-display.component';


describe('TopRatedComponent', () => {
  let component: TopRatedComponent;
  let fixture: ComponentFixture<TopRatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopRatedComponent ],
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
    fixture = TestBed.createComponent(TopRatedComponent);
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
    expect(title.innerHTML).toBe('TOP RATED MOVIES');
  });
});
