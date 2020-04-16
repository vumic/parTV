import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Cast } from '../Cast';
import { Movie } from '../Movie';
import { User } from '../user.model';
import { AuthService } from '../auth.service';
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
import { MovieDisplayComponent } from './movie-display.component';
const config = {
  apiKey: "AIzaSyCZlbqn6rRIyunepEx2o2ShLqsnXLXpr68",
  authDomain: "partv-bd58d.firebaseapp.com",
  databaseURL: "https://partv-bd58d.firebaseio.com",
  projectId: "partv-bd58d",
  storageBucket: "partv-bd58d.appspot.com",
  messagingSenderId: "557773541901",
  appId: "1:557773541901:web:ebb8ae79b51220a3f7fb44",
  measurementId: "G-MZNMJMEKR1"
};
describe('MovieDisplayComponent', () => {
  let component: MovieDisplayComponent;
  let fixture: ComponentFixture<MovieDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieDisplayComponent ] 
      , imports: [MatSelectModule,
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
    fixture = TestBed.createComponent(MovieDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  let data = {
    "adult": false,
    "budget": 125000000,
    "genres": [
      {
        "id": 12,
        "name": "Adventure"
      },
      {
        "id": 14,
        "name": "Fantasy"
      },
      {
        "id": 10751,
        "name": "Family"
      }
    ],
    "id": 671,
    "imdb_id": "tt0241527",
    "original_title": "Harry Potter and the Philosopher's Stone",
    "overview": "Harry Potter has lived under the stairs at his aunt and uncle's house his whole life. But on his 11th birthday, he learns he's a powerful wizard -- with a place waiting for him at the Hogwarts School of Witchcraft and Wizardry. As he learns to harness his newfound powers with the help of the school's kindly headmaster, Harry uncovers the truth about his parents' deaths -- and about the villain who's to blame.",
    "popularity": 86.885,
    "poster_path": "/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg",
    "release_date": "2001-11-16",
    "revenue": 976475550,
    "runtime": 152,
    "tagline": "Let the Magic Begin.",
    "title": "Harry Potter and the Philosopher's Stone",
    "vote_average": 7.9,
    "vote_count": 16292
  };
  it('Movie testing.', () => {
  
    const title = fixture.debugElement.nativeElement.querySelector('#cast_label');
    expect(title.innerHTML).toBe('Cast');
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Cast Exists.', () => {
    const title = fixture.debugElement.nativeElement.querySelector('#cast_label');
    expect(title.innerHTML).toBe('Cast');
  });
});
