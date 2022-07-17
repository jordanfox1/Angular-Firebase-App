import { TrainingService } from './../training/training.service';
import { AuthData } from "./auth-data.model";
import { User } from "./user.model";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ThisReceiver } from "@angular/compiler";
import { AngularFireAuth } from "@angular/fire/compat/auth";
// AngularFire stores, manages and sends firebase auth token behind the scenes, so we don't need to handle that. we can simply call the auth functions. 

@Injectable({
    providedIn: "root"
})
// service to handle authorization methods
export class AuthService {
    authChange = new Subject<boolean>() // subject allows you to emit events from one part of the app, and subscribe to them in another
    // private user: User | null | undefined;
    private isAuthenticatedUser = false

    constructor(private router: Router, private afAuth: AngularFireAuth, private trainingService: TrainingService) {}

    //call this when the app starts
    initAuthListener() {
        // emits an event onAuthStateChanged()
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.isAuthenticatedUser = true
                this.authChange.next(true);
                this.router.navigate(['/training'])
            } else {
                this.trainingService.cancelSubscriptions()
                // whenever we logout a user, we call authChange and pass it a value of false
                this.authChange.next(false)// .next(cbf) is used like .emit() in angular
                this.isAuthenticatedUser = false
                this.router.navigate(['login'])
            }
        })
    }

    signUp(authData: AuthData) {        
        // this.user = {
        //     email: authData.email,
        //     userId: Math.round(Math.random() * 10000).toString()
        // };
        // // whenever we register a user, we call authChange and pass it a value of true
        // this.authChange.next(true)// .next(cbf) is used like .emit() in angular
        this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
        .then(res => console.log(res)).catch(err => console.log(err))
        this.handleSuccessfulAuthentication()
    }

    login(authData: AuthData) {
        // this.user = {
        //     email: authData.email,
        //     userId: Math.round(Math.random() * 10000).toString()
        // }
        // // whenever we login a user, we call authChange and pass it a value of true
        // this.authChange.next(true)// .next(cbf) is used like .emit() in angular

        this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
        .then(res => console.log(res)).catch(err => console.log(err))
        this.handleSuccessfulAuthentication()
    }

    logout() {
        // this.user = null;
        this.afAuth.signOut()
        // cancel all subscribed observables when logging out

    }
    
    // getUser() {
    //     return { ...this.user };
    // }

    isAuthenticated() {
       return this.isAuthenticatedUser;
    }
    
    private handleSuccessfulAuthentication() {

    }
}