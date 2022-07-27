import { UIService } from './../../shared/ui.service';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Store } from '@ngrx/store'
import * as fromRoot from '../../app.reducer'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading: Observable<boolean>
  loadingSub: Subscription;
  constructor(private authService: AuthService, private uiService: UIService, private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.isLoading = this.store.select(fromRoot.getIsLoading) //subscribe to the store
  }

  onSubmit(form: any) {
    console.log(form.value.email)
    console.log(form.value.password)

    this.authService.login({
      email: form.value.email,
      password: form.value.password
    })
  }
}
