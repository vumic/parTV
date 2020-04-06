import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
@Component({
  selector: 'app-create-a-party',
  templateUrl: './create-a-party.component.html',
  styleUrls: ['./create-a-party.component.css']
})
export class CreateAPartyComponent implements OnInit {
  keyword1: string;
  keyword2: string;
  keyword3: string;
  subscription;
  WL1;
  WL2;
  WL3;
  yourWL;
  onein;
  twoin;
  threein;
  finalWL;
  finalin;
  user: User;
  constructor(public auth: AuthService, private afs: AngularFirestore, ) {
    this.onein = false;
    this.twoin = false;
    this.threein = false;
    this.finalin = false;
  }

  ngOnInit(): void {
    this.subscription = this.auth.user$.subscribe(async (user) => {
      this.user = user;
      this.auth.getWatchlist(this.user.uid).subscribe(x => {
        this.yourWL = x;
      })
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  merge() {
    var diffs = [];
    var diffs2 = [];
    var diffs3 = [];
    if (this.onein == true && this.yourWL) {
      for (var key in this.yourWL) {
        for (var obj in this.WL1) {
          if (this.yourWL[key].id == this.WL1[obj].id) {
            diffs.push(this.yourWL[key]);
          }
        }
      }
      this.finalWL = diffs;
      if (this.twoin == true && this.WL2) {
        for (var key in diffs) {
          for (var obj in this.WL2) {
            if (diffs[key].id == this.WL2[obj].id) {
              diffs2.push(diffs[key]);
            }
          }
        }
        this.finalWL = diffs2;
      }
      if (this.threein == true && this.WL3) {
        for (var key in diffs2) {
          for (var obj in this.WL3) {
            if (diffs2[key].id == this.WL3[obj].id) {
              diffs3.push(diffs2[key]);
            }
          }
        }
        this.finalWL = diffs3;
      }
      this.finalin = true;
    }
  }

  addPerson(p) {
    if ((p == 1) && this.keyword1) {
      this.auth.getUser(this.keyword1);
      setTimeout(() => (this.WL1 = this.auth.WL1, this.onein = true), 400);
    }
    if ((p == 2) && this.keyword2) {
      this.auth.getUser(this.keyword2);
      setTimeout(() => (this.WL2 = this.auth.WL1, this.twoin = true), 400);
    }
    if ((p == 3) && this.keyword3) {
      this.auth.getUser(this.keyword3);
      setTimeout(() => (this.WL3 = this.auth.WL1, this.threein = true), 400);
    }
  }
}
