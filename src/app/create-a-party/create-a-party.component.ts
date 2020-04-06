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
  WL: any[];
  in: boolean[];
  user: User;
  constructor(public auth: AuthService, private afs: AngularFirestore, ) {
    this.in = new Array(4).fill(false);
    this.WL = [];
  }

  ngOnInit(): void {
    this.subscription = this.auth.user$.subscribe(async (user) => {
      this.user = user;
      this.auth.getWatchlist(this.user.uid).subscribe(x => {
        this.WL[0] = x;
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
    if (this.in[1] == true && this.WL[1]) {
      for (var key in this.WL[0]) {
        for (var obj in this.WL[1]) {
          if (this.WL[0][key].id == this.WL[1][obj].id) {
            diffs.push(this.WL[0][key]);
            console.log(diffs);
          }
        }
      }
      this.WL[4] = diffs;
      if (this.in[2] == true && this.WL[2]) {
        for (var key in diffs) {
          for (var obj in this.WL[2]) {
            if (diffs[key].id == this.WL[2][obj].id) {
              diffs2.push(diffs[key]);
            }
          }
        }
        this.WL[4] = diffs2;
      }
      if (this.in[3] == true && this.WL[3]) {
        for (var key in diffs2) {
          for (var obj in this.WL[3]) {
            if (diffs2[key].id == this.WL[3][obj].id) {
              diffs3.push(diffs2[key]);
            }
          }
        }
        this.WL[4] = diffs3;
      }
      this.in[4] = true;
    }
  }

  addPerson(p) {
    if ((p == 1) && this.keyword1) {
      this.auth.getUser(this.keyword1);
      setTimeout(() => ( this.WL[1] = this.auth.WL1,this.in[1] = true), 400);
    }
    if ((p == 2) && this.keyword2) {
      this.auth.getUser(this.keyword2);
      setTimeout(() => ( this.WL[2] = this.auth.WL1,this.in[2] = true), 400);
    }
    if ((p == 3) && this.keyword3) {
      this.auth.getUser(this.keyword3);
      setTimeout(() => ( this.WL[3] = this.auth.WL1,this.in[3] = true), 400);
    }
  }
}
