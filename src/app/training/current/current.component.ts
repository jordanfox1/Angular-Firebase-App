import { StopTrainingComponent } from './stop-training.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';


@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})
export class CurrentComponent implements OnInit {
  @Output() exitTraining = new EventEmitter()
  progress = 0;
  timer: any;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.startTimer()
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.progress = this.progress + 5
      if (this.progress >= 100) {
        clearInterval(this.timer)
      }
    }, 1000)
  }

  onStop() {
    clearInterval(this.timer)
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    }) //pass data to the dialog component

    dialogRef.afterClosed().subscribe(res => {
      console.log(res)
      if (res) {
        this.exitTraining.emit()
      } else {
        this.startTimer()
      }
    })
  }
}

