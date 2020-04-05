import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Movie } from '../Movie';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  movieCollection: AngularFirestoreCollection<Movie>;
  movies;

  constructor(public auth: AuthService, private afs: AngularFirestore, ) {

  }

  ngOnInit(): void {
    this.auth.getWatchlist().subscribe(x => {
      this.movies = x;
    })

  }



}
