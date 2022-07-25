import { Exercise } from './../exercise.model';
import { filter, Observable, Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { TrainingService } from './../training.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Firestore, collectionData, collection, getDocs } from '@angular/fire/firestore'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { map } from 'rxjs/internal/operators/map';
import * as fromTraining from '../training.reducer'
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit, OnDestroy {
  exc = { name: 'title', description: 'lorem ipsum' }

  @ViewChild('input')
  collection: any
  input!: ElementRef;
  exercises$: Observable<Exercise[]>
  exerciseSubscription: Subscription
  isLoading$: Observable<boolean>

  constructor(
    private trainingService: TrainingService,
    public firestore: Firestore,
    private db: AngularFirestore,
    private store: Store<fromTraining.State>
  ) { }


  ngOnInit(): void {
    // this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(ex => this.exercises$ = ex)
    // this.trainingService.fetchAvailableExercisesFromDb();
    this.isLoading$ = this.store.select(fromRoot.getIsLoading)
    this.exercises$ =  this.store.select(fromTraining.getAvailableExercises)
    this.trainingService.fetchAvailableExercisesFromDb()
  }

  onStart(f: NgForm): void {
    console.log(f)
    this.trainingService.startExcercise(f?.value?.exercise)
  }

  addExercise(): void {
    // this.availableExercises.push({
    //   name: this.input.nativeElement.value,
    //   id: '',
    //   duration: 0
    // })
  }

  ngOnDestroy() {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe()
    }
  }
}
