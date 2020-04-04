
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
  u ;
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

  async getWatchlist() {
    const credential = await this.FirebaseApp.auth().currentUser.uid;
    return this.afs.collection("users").doc(`${credential}`).collection('watchlist').snapshotChanges();
  }

   isInWatchlist(movieID, uid) {
    this.afs.collection('users').doc(`${uid}`).collection(`watchlist`, ref => ref.where('movie', "==", movieID))
      .snapshotChanges().subscribe(res => {
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

  async addToWatchlist(movieId) {
    const credential = await this.afAuth.auth.currentUser;
    return this.afs.collection("users").doc(`${credential.uid}`).collection("watchlist").doc(`${movieId}`).set(
      { movie: movieId }
    );
  }
  async deleteFromWatchlist(movieId) {
    const credential = await this.afAuth.auth.currentUser;
    return this.afs.collection("users").doc(`${credential.uid}`).collection("watchlist").doc(`${movieId}`).delete();
  }
  async existsMovie(movieId) {
    const credential = await this.afAuth.auth.currentUser;
    const docRef = this.afs.collection("users").doc(`${credential.uid}`).collection("watchlist").doc(`${movieId}`);

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