import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Movie } from '../Movie';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  movieCollection: AngularFirestoreCollection<Movie>;
  movies;
  user: User;
  constructor(public auth: AuthService, private afs: AngularFirestore, ) {

  }

  ngOnInit(): void {
    this.auth.user$.subscribe(async (user) => {
      this.user = user;
      this.auth.getWatchlist(this.user.uid).subscribe(x => {
        this.movies = x;
      })
    });

  }



}
