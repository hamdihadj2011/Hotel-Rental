import React from "react";
import { connect } from "react-redux";
import {RentalMap} from "./RentalMap";
import * as actions from "../../../actions";

import RentalDetailInfo from "./RentalDetailInfo";
import RentalDetailUpdate from './RentalDetailUpdate'
import Booking from '../../Booking/Booking'

class RentalDetail extends React.Component {
  componentWillMount() {
    const rentalId = this.props.match.params.id;
    this.props.dispatch(actions.fetchRentalById(rentalId));
  }

  renderRentalDetail=(rental)=>{
    const {isUpdate}=this.props.location.state || false

   return isUpdate ? <RentalDetailUpdate rental={rental}/> : <RentalDetailInfo rental={rental} />
  }
  render() {
    const { rental } = this.props;
    return rental._id ? (
      <section id='rentalDetails'>
        <div className='upper-section'>
          <div className='row'>
            <div className='col-md-6'>
              <img src={rental.image} alt=''></img>
            </div>
            <div className='col-md-6'>
              <RentalMap location ={`${rental.city} ,${rental.street} `} />
            </div>
          </div>
        </div>

        <div className='details-section'>
          <div className='row'>
            <div className='col-md-8'>
               {
                 this.renderRentalDetail(rental)
               }
            </div>
            <div className='col-md-4'> 
            <Booking  rental={rental}/>
            </div>
          </div>
        </div>
      </section>
    ) : (
      <h1>Loading....</h1>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    rental: state.rental.data,
  };
};

export default connect(mapStateToProps)(RentalDetail);
