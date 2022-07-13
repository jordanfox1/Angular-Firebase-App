import { NgForm } from '@angular/forms';
import { TrainingService } from './../training.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  exc = { name: 'title', description: 'lorem ipsum' }

  @ViewChild('input')
  input!: ElementRef;

  constructor(private trainingService: TrainingService) { }

  availableExercises = this.trainingService.getAvailableExercises();


  ngOnInit(): void {
  }

  onStart(f: NgForm): void {
    // console.log(f)
    this.trainingService.startExcercise(f.value.exercise)
  }

  addExercise(): void {
    this.availableExercises.push({
      name: this.input.nativeElement.value,
      id: '',
      duration: 0
    })
  }

}
