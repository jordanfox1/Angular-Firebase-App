import * as fromAuth from './auth/auth.reducer'
import * as fromUi from './shared/ui.reducer'
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store'


//define application wide state
//these are the pieces of state you can hook into throught the app
export interface State {
    ui: fromUi.State
    auth: fromAuth.State
}

export const reducers: any = {
    ui: fromUi.uiReducer,
    auth: fromAuth.authReducer
}

export const getUiState = createFeatureSelector<fromUi.State>('ui')
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading)

export const getAuthState = createFeatureSelector<fromAuth.State>('auth') // this is what you will get when you access the auth pice of state
export const getIsAuth = createSelector(getAuthState,fromAuth.getIsAuthenticated)