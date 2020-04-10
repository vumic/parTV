import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
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

//components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PopularMoviesComponent } from './popular-movies/popular-movies.component';
import { RequestApiService } from './request-api.service';
import { MovieDisplayComponent } from './movie-display/movie-display.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { TopRatedComponent } from './top-rated/top-rated.component';
import { NowPlayingComponent } from './now-playing/now-playing.component';
import { RandomMovieComponent } from './random-movie/random-movie.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './auth.guard';
import { LoginPageComponent } from './login-page/login-page.component';
import { CreateAPartyComponent } from './create-a-party/create-a-party.component';

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
describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [MatSelectModule,
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
        { path: '', component: HomePageComponent },
        { path: 'movie/:movieID', component: MovieDisplayComponent },
        { path: 'search/:query/:page', component: SearchPageComponent },
        { path: 'about', component: AboutPageComponent },
        { path: 'user', component: UserProfileComponent, canActivate: [AuthGuard] },
        { path: 'login', component: LoginPageComponent },
        { path: 'random', component: RandomMovieComponent },
        { path: 'party', component: CreateAPartyComponent }
      ])],
    declarations: [
      AppComponent,
      HeaderComponent,
      PopularMoviesComponent,
      MovieDisplayComponent,
      HomePageComponent,
      SearchPageComponent,
      AboutPageComponent,
      TopRatedComponent,
      NowPlayingComponent,
      UserProfileComponent,
      RandomMovieComponent,
      LoginPageComponent,
      CreateAPartyComponent],
    providers: [RequestApiService]});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
