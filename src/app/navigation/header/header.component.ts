import { Component, EventEmitter, OnInit, Input, Output, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>()

  isAuthenticatedUser: any;
  authSubscription: Subscription | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
  this.authSubscription =  this.authService.authChange.subscribe(authStatus => {
      console.log(authStatus)
      this.isAuthenticatedUser = authStatus
    }) //subscribe to the value passed to/emitted by authChange
  }

  ngOnDestroy(): void {
    // clears up the subscription when the component is removeed from the DOM
    this.authSubscription?.unsubscribe()
  }

  onToggle() {
    this.sidenavToggle.emit();
    console.log(this.isAuthenticatedUser);
  }
}
