import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../models/user';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLogged: any = false;
  constructor(public afAuth: AngularFireAuth, private afsAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => (this.isLogged = user));
   }

   // regyster

   async onRegister(user: User){
    try{
      return await this.afAuth.createUserWithEmailAndPassword(
        user.password,
        user.email
      );
    } catch (error){
      console.log('error on regiser', error);
    }
   }

   loginGitUser(){
     return this.afAuth.signInWithPopup(new auth.GithubAuthProvider());
   }

   loginGoogleUser(){
    return this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
  }
}
