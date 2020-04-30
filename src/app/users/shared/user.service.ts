import {Injectable} from "@angular/core";
import {AuthUser} from "./user";
import {from, Observable} from "rxjs";
import {AngularFirestore, Query} from "@angular/fire/firestore";
import {map} from "rxjs/operators";
import {AuthenticationService} from "../../services/authentication.service";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: Observable<AuthUser[]>;

  newArray: AuthUser[] = []


  constructor(private fs: AngularFirestore, private auth: AuthenticationService) {
  }

  getAllUsers(): Observable<AuthUser[]> {
    return this.fs.collection<AuthUser>('Users',
        ref => ref.orderBy('name')
          .limit(5)).snapshotChanges().pipe(map(data => {
      this.newArray = [];
      data.forEach(doc => {
        this.newArray.push({
          uid: doc.payload.doc.id,
          name: doc.payload.doc.data().name,
          email: doc.payload.doc.data().email
        });
      });
      return this.newArray;
    }));
  }

  deleteUser(user: AuthUser): Observable<AuthUser> {
    return from(
      this.fs
        .doc(`Users/${user.uid}`)
        .delete()
    ).pipe(
      map(() => {
        return user;
      })
    );
  }

  updateUser(user: AuthUser): Observable<AuthUser> {
    return from( this.fs.doc(`Users/${user.uid}`).update(user)).
    pipe( map(() => {
      return user; }
    ));
  }

  getNextSetOfUsers() {
    return this.fs.collection<AuthUser>('Users',
        ref => ref.orderBy('name')
          .startAfter(ref.doc().path)
          .limit(5)).snapshotChanges().pipe(map(data => {
            this.newArray = []
      data.forEach(doc => {
        this.newArray.push({
          uid: doc.payload.doc.id,
          name: doc.payload.doc.data().name,
          email: doc.payload.doc.data().email,
        });
      });
      return this.newArray;
    }));
  }

  createUserWithEmailAndPassword(email: string, password: string, name: string) {
    return this.auth.createUserWithEmailAndPassword(
      email,
      password,
      name
    )
  }
}
