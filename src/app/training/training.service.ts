import { StartLoading } from './../shared/ui.actions';
import { UIService } from './../shared/ui.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { map, Subject } from 'rxjs';
import { Subscription } from "rxjs";
import * as fromTraining from './training.reducer'
import { Store } from '@ngrx/store';
import * as Training from './training.actions'


@Injectable({
    providedIn: 'root'
})
export class TrainingService {
    private firebaseSubscriptions: Subscription[] = []
    private availableExercises: Array<any>
    constructor(private db: AngularFirestore, private uiService: UIService, private store: Store<fromTraining.State>) { }
    private exercises: Exercise[] = []
    private currentExercise: Exercise | any

    // create an obervable which will emit whenever the currently performed exercise changes
    public exerciseChanged = new Subject<any>()
    exercisesChanged = new Subject<any>()
    finishedExercisesChanged = new Subject<any>()

    fetchAvailableExercisesFromDb() {
        this.firebaseSubscriptions.push(this.db.collection('/avaliableExercises').snapshotChanges().pipe(
            map(v => {
                return v.map(e => {
                    return e.payload.doc.data() // return an Observable array of exercises
                })
            })
        ).subscribe((exercises: Array<any>) => {
            this.availableExercises = exercises
            this.store.dispatch(new Training.SetAvailableTrainings(exercises))
            // this.exercisesChanged.next([...this.availableExercises]) //emit an event every time the exercises on firebase update/get fetched
        }, error => {
            this.uiService.loadingStateChanged.next(false)
            this.uiService.showSanckbar('Fetching Exercises failed... tray again later', null, 3000)
            console.log(error.message)
        }))
    }

    startExcercise(selectedId: string) {
        // to update firestore document, you need to pass the parent collection/document ID. I didn't set the exercise ID to the name, So below is a hardcoded example
        // this.db.doc('avaliableExercises/'+ 'V1V0MbvRc6Ez9F65WiLN').update({lastSelected: new Date()})
        this.currentExercise = this.availableExercises.find(ex => ex.id === selectedId)
        this.exerciseChanged.next({ ...this.currentExercise })
    }

    getCurrentExercise() {
        return { ...this.currentExercise }
    }

    completeExercise() {
        this.addDataToDatabase({
            ...this.currentExercise,
            date: new Date(),
            state: 'complete'
        })
        // this.currentExercise = null
        // this.exerciseChanged.next(null)
        this.store.dispatch(new Training.StopTraining())

        // this.exercises.push({ ...this.currentExercise, date: new Date(), state: 'completed' })
        // this.currentExercise = null
        // this.exerciseChanged.next(null)
    }

    cancelExercise(progress: number) {
        this.addDataToDatabase({
            ...this.currentExercise,
            duration: this.currentExercise?.duration * (progress / 100),
            calories: this.currentExercise?.calories * (progress / 100),
            date: new Date(),
            state: 'cancelled'
        })
        this.store.dispatch(new Training.StopTraining())

        // this.exercises.push({ ...this.currentExercise, date: new Date(), state: 'cancelled', duration: this.currentExercise?.duration * (progress / 100), calories: this.currentExercise.duration * (progress / 100) })
        // this.currentExercise = null
        // this.exerciseChanged.next(null)
    }

    getCompletedOrCancelledExercises() {
        this.firebaseSubscriptions.push(this.db.collection('/finishedExercises')
        .valueChanges()
        .subscribe((exercises: any) => {
            this.store.dispatch(new Training.SetFinishedTrainings(exercises))
        } ))
        return this.exercises.slice()
    }

    cancelSubscriptions() {
        this.firebaseSubscriptions.forEach(sub => sub.unsubscribe())
    }

    private addDataToDatabase(exc: Exercise) {
        console.log(exc)
        this.db.collection('finsihedExercises').add(exc)
    }
}