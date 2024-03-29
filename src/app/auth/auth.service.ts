import { TrainingService } from './../training/training.service';
import { AuthData } from "./auth-data.model";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { MatSnackBar } from '@angular/material/snack-bar';
import { UIService } from '../shared/ui.service';
import {Store} from '@ngrx/store'
import * as fromRoot from '../app.reducer'
import * as UI from '../shared/ui.actions'
import * as Auth from './auth.actions'
// AngularFire stores, manages and sends firebase auth token behind the scenes, so we don't need to handle that. we can simply call the auth functions. 

@Injectable({
    providedIn: "root"
})
// service to handle authorization methods
export class AuthService {
    authChange = new Subject<boolean>() // subject allows you to emit events from one part of the app, and subscribe to them in another
    private isAuthenticatedUser = false
                //accessing the global store
    constructor(private store: Store<fromRoot.State>, private uiService: UIService, private snackbar: MatSnackBar, private router: Router, private afAuth: AngularFireAuth, private trainingService: TrainingService) { }

    // called in app.component/onInit()
    initAuthListener() {

        // emits an event onAuthStateChanged()
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.store.dispatch(new Auth.SetAuthenticated())
                this.isAuthenticatedUser = true
                this.authChange.next(true);
                this.router.navigate(['/training'])
            } else {
                this.trainingService.cancelSubscriptions()
                this.store.dispatch(new Auth.SetUnauthenticated())

                // whenever we logout a user, we call authChange and pass it a value of false
                this.authChange.next(false)// .next(cbf) is used like .emit() in angular
                this.isAuthenticatedUser = false
                this.router.navigate(['login'])
            }
        })
    }

    signUp(authData: AuthData) {

        this.store.dispatch(new UI.StartLoading) //dispatch this action to the store
        this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
            .then(res => {
                this.uiService.loadingStateChanged.next(false)
            })
            .catch(err => {
                this.store.dispatch(new UI.StopLoading) //dispatch to the store
                this.uiService.showSanckbar(err.message, null, 3000)
            })
        this.handleSuccessfulAuthentication()

    }

    login(authData: AuthData) {
        this.store.dispatch(new UI.StartLoading) //dispatch this action to the store

        this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
            .then(res => {
                this.store.dispatch(new UI.StopLoading) //dispatch to the store
            })
            .catch(err => {
                this.store.dispatch(new UI.StopLoading)//dispatch to the store
                this.uiService.showSanckbar(err.message, null, 3000)
            })
        this.handleSuccessfulAuthentication()
    }

    logout() {
        this.uiService.loadingStateChanged.next(true)
        this.afAuth.signOut()
        this.uiService.loadingStateChanged.next(false)
    }

    isAuthenticated() {
        return this.isAuthenticatedUser;
    }

    private handleSuccessfulAuthentication() {

    }
}