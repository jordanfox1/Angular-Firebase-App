import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  exc = {name: 'title', description: 'lorem ipsum'}
  @Output() start = new EventEmitter<void>()

  constructor() { }

  ngOnInit(): void {
  }

  onStart() :void {
    this.start.emit()
  }

}
