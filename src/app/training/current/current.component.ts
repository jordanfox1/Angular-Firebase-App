import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})
export class CurrentComponent implements OnInit {
  progress = 0;
  timer: any;

  constructor() { }

  ngOnInit(): void {
    this.timer = setInterval(() => {
      this.progress = this.progress + 5
      if (this.progress >= 100) {
        clearInterval(this.timer)
      }
    }, 1000)
  }

  onStop() {
    clearInterval(this.timer)
  }

}
