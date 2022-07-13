import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TrainingService {

    private availableExercises: Exercise[] = [
        { id: 'push-ups', name: 'Push Ups', duration: 30, caloriesBurned: 8 },
        { id: 'bodyweight-squats', name: 'Bodyweight Squats', duration: 20, caloriesBurned: 8 },
        { id: 'bicep-curl', name: 'Bicep Curls', duration: 10, caloriesBurned: 8 },
        { id: 'walking', name: 'walking', duration: 20, caloriesBurned: 8 },
        { id: 'jogging', name: 'Jogging', duration: 140, caloriesBurned: 8 },
    ];
    constructor() { }

    private exercises: Exercise[] = []
    private currentExercise: Exercise | any
    // create an obervable which will emit whenever the currently performed execise changes
    public exerciseChanged = new Subject<any>()

    getAvailableExercises() {
        return this.availableExercises.slice();
    }

    startExcercise(selectedId: string) {
        this.currentExercise = this.availableExercises.find(ex => ex.id === selectedId)
        this.exerciseChanged.next({ ...this.currentExercise })
    }

    getCurrentExercise() {
        return { ...this.currentExercise }
    }

    completeExercise() {
        this.exercises.push({ ...this.currentExercise, date: new Date(), state: 'completed' })
        this.currentExercise = null
        this.exerciseChanged.next(null)
    }

    cancelExercise(progress: number) {
        this.exercises.push({ ...this.currentExercise, date: new Date(), state: 'cancelled', duration: this.currentExercise?.duration * (progress / 100), calories: this.currentExercise.duration * (progress / 100) })
        this.currentExercise = null
        this.exerciseChanged.next(null)
    }

    getCompletedOrCancelledExercises() {
        return this.exercises.slice()
        
    }
}