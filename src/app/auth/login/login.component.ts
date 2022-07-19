import { UIService } from './../../shared/ui.service';
import { AuthService } from './../auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false
  loadingSub: Subscription;
  constructor(private authService: AuthService, private uiService: UIService) { }

  ngOnInit(): void {
    this.loadingSub = this.uiService.loadingStateChanged.subscribe(loadingState => {
      this.isLoading = loadingState
    })
  }

  onSubmit(form: any) {
    console.log(form.value.email)
    console.log(form.value.password)

    this.authService.login({
      email: form.value.email,
      password: form.value.password
    })
  }

  ngOnDestroy() {
    if (this.loadingSub) {
      this.loadingSub.unsubscribe()
    }
  }
}
