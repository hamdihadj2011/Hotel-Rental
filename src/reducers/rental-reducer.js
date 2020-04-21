import * as types from '../actions/types'

const initialState={
    rentals:{
        data:[],
        errors:[]
    },
    rental:{
        data:{}
    }
}
export const rentalReducer=(state=initialState.rentals,action)=>{
    switch(action.type){
        case types.FETCH_RENTALS_SUCCESS:
            return {
                ...state,
                data:action.rentals
            }
        case types.FETCH_RENTALS_INIT:
            return {
                ...state,
                data:[],
                errors:[]
            }
        case types.FETCH_RENTALS_FAIL:
            return {
                ...state,
                errors:[...state.errors,action.errors]
            }
        default:
             return state
    }
}

export const selectedRentalReducer=(state=initialState.rental,action)=>{
    switch(action.type){
        case types.FETCH_RENTAL_BY_ID_SUCCESS:
            console.log(action.rental)
            return {
                ...state,
                data:action.rental
            }
        case types.FETCH_RENTAL_BY_ID_INIT:
            return {
                ...state,
                data:{}
            }
        default:
            return state
    }
}