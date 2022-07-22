import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Store} from '@ngrx/store'
import * as fromRoot from '../../app.reducer'

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() sideNavClose = new EventEmitter<void>()

  isAuth$: Observable<boolean>

  constructor(private authService: AuthService, private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth)
  }

  close() {
    this.sideNavClose.emit()
  }

  onLogout() {
    this.close()
    this.authService.logout()
  }

}
