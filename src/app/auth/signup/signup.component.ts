import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
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

}
