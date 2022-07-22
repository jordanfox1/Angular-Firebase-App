import * as fromUi from './shared/ui.reducer'
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store'

//define application wide state
export interface State {
    ui: fromUi.State
}

export const reducers: any = {
    ui: fromUi.uiReducer
}

export const getUiState = createFeatureSelector<fromUi.State>('ui')
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading)