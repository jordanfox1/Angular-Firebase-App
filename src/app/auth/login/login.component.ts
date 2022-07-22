import { UIService } from './../../shared/ui.service';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import {Store} from '@ngrx/store'
import * as fromApp from '../../app.reducer'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading: Observable<boolean>
  loadingSub: Subscription;
  constructor(private authService: AuthService, private uiService: UIService, private store: Store<{ui: fromApp.State}>) { }

  ngOnInit(): void {
    this.isLoading = this.store.pipe(
      map(state => state.ui.isLoading)
    ) //subscribe to the store

    // this.loadingSub = this.uiService.loadingStateChanged.subscribe(loadingState => {
    //   this.isLoading = loadingState
    // })
  }

  onSubmit(form: any) {
    console.log(form.value.email)
    console.log(form.value.password)

    this.authService.login({
      email: form.value.email,
      password: form.value.password
    })
  }

  // ngOnDestroy() {
  //   if (this.loadingSub) {
  //     this.loadingSub.unsubscribe()
  //   }
  // }
}
