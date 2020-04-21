import * as types from "./types";
import axios from "axios";
import authService from '../Services/auth-service'
import axiosService from '../Services/axios-services'
import { authReducer } from "../reducers/auth-reducer";

const axiosInstance =axiosService.getInstance()
const fetchRentalSuccess = (rentals) => {
  return {
    type: types.FETCH_RENTALS_SUCCESS,
    rentals,
  };
};

const fetchRentalInit=()=>{
  return {
    type:types.FETCH_RENTALS_INIT
  }
}

const fetchRentalFail=(errors)=>{
  return {
type:types.FETCH_RENTALS_FAIL,
errors
  }
}

export const fetchRentals = (city) => {
  const url=city ? `/rentals?city=${city}`:'/rentals'
  return (dispatch) => {
    dispatch(fetchRentalInit())

    axiosInstance.get(url)
    .then((rentals) => {
      dispatch(fetchRentalSuccess(rentals.data))
      
    })
    .catch(err=> dispatch(fetchRentalFail(err.response.data)))
  };
};
const fetchRentalByIdSuccess = (rental) => {
  return {
    type: types.FETCH_RENTAL_BY_ID_SUCCESS,
    rental,
  };
};
const fetchRentalByIdInit = () => {
  return {
    type: types.FETCH_RENTAL_BY_ID_INIT,
  };
};
export const fetchRentalById = (rentalId) => {
  return function (dispatch) {
    dispatch(fetchRentalByIdInit());
    axios.get(`/api/v1/rentals/${rentalId}`).then((rental) => {
      dispatch(fetchRentalByIdSuccess(rental.data));
    });
  };
};


export const createRental=(rentalData)=>{
  return axiosInstance.post('/rentals',{...rentalData})
      .then((res)=>{
          return res.data
      },(err)=>{
        return Promise.reject(err.response.data.errors)
      })

}


//Auth Actions

export const register=(userData)=>{
  return axios.post('/api/v1/users/register',{...userData})
      .then((res)=>{
          return res.data
      },(err)=>{
        return Promise.reject(err.response.data.errors)
      })

}


 const loginSuccess=()=>{
   const username=authService.getUsername()
  return {
    type:types.LOGIN_SUCCESS, 
    username
  }
}

 const loginFailure=(errors)=>{
   
  return {
    type:types.LOGIN_FAILURE,
    errors
  }
}

export const checkAuth=()=>{
  return dispatch=>{
if(authService.isAuthenticated()){
  dispatch(loginSuccess())
}
  }
}

export const Login=(userData)=>{
return dispatch=>{
  return axios.post('api/v1/users/auth',userData)
    .then(res=>res.data)
    .then(token=>{
      localStorage.setItem('auth_token',token)
      dispatch(loginSuccess())
    })
    .catch(err=>{
      dispatch(loginFailure(err.response.data))
      // console.log(err.response.data)
    })
}
}


export const Logout=()=>{
authService.invalidateUser()
  return {
    type:types.LOGOUT
  }
}


export const createBooking=(booking)=>{
  
  return axiosInstance.post('/bookings',booking)
    .then(res=>res.data)
    .catch(err=> Promise.reject(err.response.data.errors))
}


//User Booking Actions
const fetchUserBookingsInit=()=>{
  return {
    type:types.FETCH_USER_BOOKINGS_INIT
  }
}

const fetchUserBookingsFail=(errors)=>{
  return {
    type:types.FETCH_USER_BOOKINGS_FAIL,
    errors
  }
}

const fetchUserBookingsSuccess=(userBookings)=>{
  return {
    type:types.FETCH_USER_BOOKINGS_SUCCESS,
    userBookings
  }
}



export const fetchUserBookings=()=>{
  return dispatch=>{
    dispatch(fetchUserBookingsInit())

    axiosInstance.get('/bookings/manage')
    .then((userBookings) => {
      console.log(userBookings)
      dispatch(fetchUserBookingsSuccess(userBookings.data))
      
    })
    .catch(err=> dispatch(fetchUserBookingsFail(err.response.data.errors)))
  };
  
}

//User Booking Actions

export const getUserRentals=()=>{
  return axiosInstance.get('/rentals/manage')
      .then((res)=>{
        
          return res.data
      },(err)=>{
        console.log(err)
        return Promise.reject(err.response.data.errors)
      })

}

export const deletRental=(rentalId)=>{
  return axiosInstance.delete(`/rentals/${rentalId}`)
    .then(res=>res.data)
     .catch((err)=> {
      //  console.log(err.response.data.errors)
       return Promise.reject(err.response.data.errors)})
    
}


export const getPendingPayment=()=>{
  return axiosInstance.get('/payments')
    .then((res)=>{
return res.data
    })
    .catch((err)=> {
      
       return Promise.reject(err.response.data.errors)})
}