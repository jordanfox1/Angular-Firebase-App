import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
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
    activeTraining: null
  };

export function trainingReducer(state = initialState, action: TrainingActions) {
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
        case START_TRAINING:
            return {
                ...state,
                activeTraining: { ...state.availableExercises.find(ex => ex.id === action.payload)}
            }
        case STOP_TRAINING:
            return {
                ...state,
                activeTraining: null
            }

        default: {
            return state;
        }
    }
}

export const getTrainingState = createFeatureSelector<TrainingState>('training')

export const getAvailableExercises = createSelector(getTrainingState, (state: TrainingState) => state.availableExercises)
export const getFinishedExercises = createSelector(getTrainingState, (state: TrainingState) => state.finishedExercises)
export const getActiveTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining)

