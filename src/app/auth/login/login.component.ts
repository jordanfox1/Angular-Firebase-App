import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  dataSream$ = new Observable<number>;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

  }

  onClick(){
    this.dataSream$.subscribe()
    console.log(this.dataSream$)
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
