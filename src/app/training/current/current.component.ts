import { TrainingService } from './../training.service';
import { StopTrainingComponent } from './stop-training.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})
export class CurrentComponent implements OnInit {
  progress = 0;
  timer: any;

  constructor(private dialog: MatDialog, private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.startTimer()
  }

  startTimer() {
    let step: any;

    if (this.trainingService.getCurrentExercise().duration) {
      step = this.trainingService.getCurrentExercise().duration
    } else {
      step = 10
    }

    this.timer = setInterval(() => {
      this.progress = this.progress + 20
      if (this.progress >= 100) {
        this.trainingService.completeExercise();
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
        // this.exitTraining.emit()
        this.trainingService.cancelExercise(this.progress)
      } else {
        this.startTimer()
      }
    })
  }
}

