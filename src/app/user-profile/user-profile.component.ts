import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Movie } from '../Movie';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, Subscription, Subject } from 'rxjs';
import { User } from '../user.model';
import { RouterModule } from '@angular/router';

import { mergeMap, filter, catchError, takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  movieCollection: AngularFirestoreCollection<Movie>;
  movies;
  private destroy$: Subject<void> = new Subject();
  user: User;
  subscription: Subscription;
  
  constructor(public auth: AuthService, private afs: AngularFirestore, ) {

  }

  ngOnInit(): void {
  this.subscription = this.auth.user$.subscribe(async (user) => {
      this.user = user;
      this.auth.getWatchlist(this.user.uid).subscribe(x => {
        this.movies = x;
      })
    });
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
