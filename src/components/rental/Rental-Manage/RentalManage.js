import React, { Component } from "react";
import { Link } from "react-router-dom";
import {toast,ToastContainer} from 'react-toastify'
import * as actions from "../../../actions";
import { RentalManageCard } from "./RentalManageCard";
class RentalManage extends Component {
  state = {
    userRentals: [],
    errors: [],
    isFetching:false
  };

  componentDidMount() {
      this.setState({isFetching:true})
    actions.getUserRentals().then(
      (userRentals) => {
          
        this.setState({ userRentals ,isFetching:false});
      },
      (errors) => {
        this.setState({ errors ,isFetching:false});
      }
    );
  }

  deleteRental=(rentalId,rentalIndex)=>{
    actions.deletRental(rentalId)
        .then(()=>{
            this.deletRentalFromList(rentalIndex)
        })
        .catch((errors)=>{
          return toast.error(errors[0].detail)
                  })
        
  }

  deletRentalFromList=(rentalIndex)=>{
      const userRentals=this.state.userRentals.slice()
      userRentals.splice(rentalIndex,1)
      this.setState({
          userRentals
      })
  }
  render() {
    const { userRentals,isFetching } = this.state;
    return (
      <div>
        <section id='userRentals'>
            <ToastContainer />
          <h1 className='page-title'>My Rentals</h1>
          <div className='row'>
            {userRentals.map((rental,index) => (
              <RentalManageCard rental={rental} key={index} rentalIndex={index} deleteRental={this.deleteRental} />
            ))}
          </div>
          {!isFetching &&userRentals.length ===0 && <div className='alert alert-warning'>
            You dont have any rentals currenty created. If you want advertised
            your property please follow this link.
            <Link
              style={{ marginLeft: "10px" }}
              className='btn btn-bwm'
              to='/rentals/new'
            >
              Register Rental
            </Link>
          </div>}
        </section>
      </div>
    );
  }
}

export default RentalManage;
