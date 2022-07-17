import { AuthData } from "./auth-data.model";
import { User } from "./user.model";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ThisReceiver } from "@angular/compiler";
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Injectable({
    providedIn: "root"
})
// service to handle authorization methods
export class AuthService {
    authChange = new Subject<boolean>() // subject allows you to emit events from one part of the app, and subscribe to them in another
    private user: User | null | undefined;
    

    constructor(private router: Router, private afAuth: AngularFireAuth) {}

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
        this.user = null;

        // whenever we logout a user, we call authChange and pass it a value of false
        this.authChange.next(false)// .next(cbf) is used like .emit() in angular
        this.router.navigate(['login'])
    }
    
    getUser() {
        return { ...this.user };
    }

    isAuthenticated() {
        if (this.user) {
            return true
        }
        return false
    }
    
    private handleSuccessfulAuthentication() {
        this.authChange.next(true);
        this.router.navigate(['/training'])
    }
}