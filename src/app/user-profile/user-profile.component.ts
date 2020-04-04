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
  movies: Observable<Movie[]>

  constructor(public auth: AuthService, private afs: AngularFirestore,) { 


   this.movieCollection = this.afs.collection<Movie>('items');
   this.movies = this.movieCollection.valueChanges();

  }

  ngOnInit(): void {
  }



}
