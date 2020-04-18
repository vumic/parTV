import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule, By } from '@angular/platform-browser';
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

import { RequestApiService } from '../request-api.service';

import { UserProfileComponent } from '../user-profile/user-profile.component';
import { AuthGuard } from '../auth.guard';
import { MovieDisplayComponent } from '../movie-display/movie-display.component';
import { AuthService } from '../auth.service';

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
describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
     
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
          { path: 'user', component: UserProfileComponent, canActivate: [AuthGuard] },
          { path: 'movie/:movieID', component: MovieDisplayComponent },
        ])],
      declarations: [UserProfileComponent],
      providers: [AuthService,RequestApiService]
  })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Popular Title Exists.', () => {
    const title = fixture.debugElement.nativeElement.querySelector('#popularTitle');
    expect(title.innerHTML).toBe('Welcome');
  });
  it('Find Button', () => {
    const but = fixture.debugElement.nativeElement.querySelector('#loginB');
    expect(but.innerHTML).toBe('Login with Google');
  });
});
