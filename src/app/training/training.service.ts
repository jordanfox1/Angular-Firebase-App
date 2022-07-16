import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { map, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TrainingService {

    private availableExercises: Array<any>
    constructor(private db: AngularFirestore) { }
    private exercises: Exercise[] = []
    private currentExercise: Exercise | any
    // create an obervable which will emit whenever the currently performed exercise changes
    public exerciseChanged = new Subject<any>()
    exercisesChanged = new Subject<any>()

    fetchAvailableExercisesFromDb() {
        this.db.collection('/avaliableExercises').snapshotChanges().pipe(
            map(v => {
                return v.map(e => {
                    return e.payload.doc.data() // return an Observable array of exercises
                })
            })
        ).subscribe((exercises: Array<any>) => {
            this.availableExercises = exercises
            this.exercisesChanged.next([...this.availableExercises]) //emit an event every time the exercises on firebase update/get fetched
        })
    }

    startExcercise(selectedId: string) {
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
        this.currentExercise = null
        this.exerciseChanged.next(null)

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
        
        // this.exercises.push({ ...this.currentExercise, date: new Date(), state: 'cancelled', duration: this.currentExercise?.duration * (progress / 100), calories: this.currentExercise.duration * (progress / 100) })
        this.currentExercise = null
        this.exerciseChanged.next(null)
    }

    getCompletedOrCancelledExercises() {
        return this.exercises.slice()

    }

    private addDataToDatabase(exc: Exercise) {
        console.log(exc)
        this.db.collection('finsihedExercises').add(exc)
    }
}