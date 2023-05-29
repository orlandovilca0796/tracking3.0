import { Injectable } from '@angular/core';
import { Auth, OAuthProvider, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /*firebaseConfig: FirebaseOptions = {
    apiKey: "AIzaSyAWmi3kxeKwusM4Een4Et5_CoUCGxXX6YQ",
    authDomain: "prueba-firebase-auth-529e5.firebaseapp.com",
    projectId: "prueba-firebase-auth-529e5",
    storageBucket: "prueba-firebase-auth-529e5.appspot.com",
    messagingSenderId: "362181732716",
    appId: "1:362181732716:web:c652b9af9c8743c7bcab49",
    measurementId: "G-LSZ3ME2E53"
  };
  firebase = initializeApp(this.firebaseConfig);
  auth = getAuth();

  analytics = getAnalytics(getApp());*/

  provider = new OAuthProvider('microsoft.com');

  constructor(private toastr: ToastrService,
    private router: Router, 
    private auth: Auth,
    private loadingService:LoadingService) { 
    this.provider.setCustomParameters({
      prompt: "consent",
      tenant: "bf487f80-42ed-468b-a966-bea109f3e46d",
      authority: 'https://login.microsoftonline.com/common',  
      redirectUri: 'http://localhost:4200',
      login_hint: 'orlandovilcahotmail.onmicrosoft.com'
    });
    this.provider.addScope('mail.read');
  }

  loginMicrosoft() {
    return signInWithPopup(this.auth, this.provider);
  }

  loginEmailPassword(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  
  signupEmailPassword(email : string, password : string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  getUser(){
    onAuthStateChanged(this.auth, (user)=>{});
    console.log('entraMedium');
    console.log(this.auth.currentUser);
    return this.auth.currentUser;
  }

  validateUserActive() {
    this.loadingService.show();
    onAuthStateChanged(this.auth, (user) => {
      console.log(user);
      if(user!=null){
        this.loadingService.hide();
        this.router.navigate(['pages/empty']);
      }else{
        this.loadingService.hide();
      }
    });
  }

  logOut() {
    return signOut(this.auth);
  }

  updateUser(name:string) {
    console.log('entra2');
    return updateProfile(this.auth.currentUser!, { displayName: name })
  }
}
