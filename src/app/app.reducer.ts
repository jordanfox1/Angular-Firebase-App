// main reducer for application
interface State {
    isLoading: boolean;
}

const initialState = {
    isLoading: false
};

export function appReducer(state = initialState, action: { type: any; }) {
    
    //we dispatch actions to change the store - we don't do it directly
    switch (action.type) {
        case 'START_LOADING':
            return {
                isLoading: true // return a new state with isLoading
            }
        case 'STOP_LOADING':
            return {
                isLoading: false
            }    
        default:
            return state;
    }
}