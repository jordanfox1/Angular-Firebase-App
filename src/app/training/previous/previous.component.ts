import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-previous',
  templateUrl: './previous.component.html',
  styleUrls: ['./previous.component.css']
})
export class PreviousComponent implements OnInit {
  // displayedColumns = ['date', 'name', 'calories', 'duration', 'state']
  // dataSource = new MatTableDataSource<Exercise>();
  exercises: Exercise[] = []

  constructor(private trainingService: TrainingService ) { }

  ngOnInit(): void {
    // this.dataSource.data = this.trainingService.getCompletedOrCancelledExercises()
    this.exercises = this.trainingService.getCompletedOrCancelledExercises();
  }

}
