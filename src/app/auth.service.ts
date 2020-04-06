
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap, delay } from 'rxjs/operators';
import { User } from './user.model';
import { FirebaseApp, } from '@angular/fire';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$: Observable<any>;
  userFull: String;
  userLoaded: boolean;
  u;
  WL1;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private FirebaseApp: FirebaseApp,

  ) {
    this.userLoaded = false;

    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );

  }

  getUser(email) {
    this.afs.collection('users', ref => ref.where(`email`, "==", email))
      .snapshotChanges().subscribe(res => {
        console.log("res: " + res);
        if (res.length > 0) {
          res.forEach(e => {
            let id = e.payload.doc.id;
            console.log("ID: ", id);
            this.getWatchlist2(id).subscribe(x => {
                this.WL1 = x;
            });
          });
        }
        else {
          this.WL1 = null;
          console.log("did not find: " + email);
        }
      });

  }
  getWatchlist2(uid) {
    return this.afs.collection("users").doc(`${uid}`).collection('watchlist').valueChanges();
  }
  getWatchlist(uid) {
    const credential = this.FirebaseApp.auth().currentUser.uid;
    return this.afs.collection("users").doc(`${uid}`).collection('watchlist').valueChanges();
  }

  isInWatchlist(movieID, uid) {
    this.afs.collection('users').doc(`${uid}`).collection(`watchlist`, ref => ref.where(`id`, "==", movieID))
      .snapshotChanges().subscribe(res => {
        console.log("res: " + res);
        if (res.length > 0) {
          this.u = true;
          console.log("found: " + movieID + " " + uid);
        }
        else {
          this.u = false;
          console.log("did not find: " + movieID + " " + uid);
        }
      });
  }

  async addToWatchlist(movieId, data) {
    const credential = await this.afAuth.auth.currentUser;
    return this.afs.collection("users").doc(`${credential.uid}`).collection("watchlist").doc(`${movieId}`).set(
      {
        adult: data.adult,
        budget: data.budget,
        id: movieId,
        original_title: data.original_title,
        popularity: data.popularity,
        release_date: data.release_date,
        revenue: data.revenue,
        title: data.title,
        vote_average: data.vote_average,
        vote_count: data.vote_count,
        poster_path: data.poster_path
      }
    );
  }
  async deleteFromWatchlist(movieId) {
    const credential = await this.afAuth.auth.currentUser;
    return this.afs.collection("users").doc(`${credential.uid}`).collection("watchlist").doc(`${movieId}`).delete();
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    return this.router.navigate(['/']);
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    }

    return userRef.set(data, { merge: true });

  }

}