import { UIService } from './../../shared/ui.service';
import { AuthService } from './../auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate: any;
  isLoading = false;
  loadingSubs: Subscription;

  constructor(private authService: AuthService, private uiService: UIService) { }


  ngOnInit(): void {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(loadingState => {
      this.isLoading = loadingState
    })
    this.maxDate = new Date()
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }

  onSubmit(form: NgForm) {
    console.log('registering user: ', form)
    // sign up the user with the details from the form
    this.authService.signUp({
      email: form.value.email,
      password: form.value.password
    });
  }

  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe()
  }
}
