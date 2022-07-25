// import {  } from './auth.actions';
import { Action } from '@ngrx/store';
// import { AuthActions,SET_AUTHENTICATED, SET_UNAUTHENTICATED } from './auth.actions';
import { SET_AVAILABLE_TRAININGS, SET_FINISHED_TRAININGS, START_TRAINING, STOP_TRAINING } from './training.actions';
import { Exercise } from './exercise.model';
import * as fromRoot from '../app.reducer'
import { TrainingActions } from './training.actions';

// state for this module
export interface TrainingState {
    availableExercises: Exercise[];
    finishedExercises: Exercise[];
    activeTraining: Exercise;
}

// state that extends app state
export interface State extends fromRoot.State {
    training: TrainingState; // global state after the training module is lazy loaded
}

// initialize our state pieces
const initialState: TrainingState = {
    availableExercises: [],
    finishedExercises: [],
    activeTraining: <any>
}

export function authReducer(state = initialState, action: TrainingActions) {
    switch (action.type) {
        case SET_AVAILABLE_TRAININGS:
            return {
                availableExercises: action.payload
            };
        case SET_FINISHED_TRAININGS:
            return {
                ...state, //distribute the old state properties to only overide the modified properties
                finishedExercises: action.payload
            }
        case SET_FINISHED_TRAININGS:
            return {
                ...state,
                activeTraining: action.payload
            }
        case SET_FINISHED_TRAININGS:
            return {
                ...state,
                activeTraining: null
            }

        default: {
            return state;
        }
    }
}

export const getAvailableExercises = (state: TrainingState) => state.availableExercises
export const getFinishedExercises = (state: TrainingState) => state.finishedExercises
export const getActiveTraining = (state: TrainingState) => state.activeTraining