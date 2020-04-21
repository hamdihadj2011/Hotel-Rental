import * as types from '../actions/types'
const INIT_STATE={
    data:[],
    errors:[],
    isFetching:false
}


export const userBookingsReducer=(state=INIT_STATE,action)=>{
    switch(action.type){
        case types.FETCH_USER_BOOKINGS_INIT:
            return {
                ...state,
                data:[],
                errors:[],
                isFetching:true
            }
        case types.FETCH_USER_BOOKINGS_FAIL:
            return {
                ...state,
                data:[],
                errors:[],
                
                isFetching:false
            }

        case types.FETCH_USER_BOOKINGS_SUCCESS:
            
            return {
                ...state,
                data:action.userBookings,
                isFetching:false
            }


        default:
            return state
    }
}