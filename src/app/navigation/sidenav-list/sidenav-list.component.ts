import { AuthService } from 'src/app/auth/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() sideNavClose = new EventEmitter<void>()

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  close() {
    this.sideNavClose.emit()
  }

  onLogout() {
    this.close()
    this.authService.logout()
  }

}
