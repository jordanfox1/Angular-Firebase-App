import {Action} from '@ngrx/store' 
import { Exercise } from './exercise.model'

//whenever we get a new available training from the backend
export const SET_AVAILABLE_TRAININGS = '[Training] Set Available Training'
export const SET_FINISHED_TRAININGS = '[Training] Set Finished Training'
export const START_TRAINING = '[Training] Start Training'
export const STOP_TRAINING = '[Training] Stop Training'

export class SetAvailableTrainings implements Action {
    readonly type = SET_AVAILABLE_TRAININGS // these actions have a type and a payload

    //payload for this action
    constructor(public payload: Exercise[]) {}

}

export class SetFinishedTrainings implements Action {
    readonly type = SET_FINISHED_TRAININGS // these actions have a type and a payload

    //payload for this action
    constructor(public payload: Exercise[]) {}

}

export class StartTraining implements Action {
    readonly type = START_TRAINING;

    constructor(public payload: Exercise){}
}

export class StopTraining implements Action {
    readonly type = STOP_TRAINING;
    //we don't have a payload here because the active training will be stored in NGRX
}

export type TrainingActions = SetAvailableTrainings | SetFinishedTrainings | StartTraining | StopTraining ;