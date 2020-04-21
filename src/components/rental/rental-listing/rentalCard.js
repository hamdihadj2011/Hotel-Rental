import React from "react";
import {Link} from 'react-router-dom'
import {rentalType} from '../../../helpers'
const RentalCard = ({ rental }) => {
  return (
    <div className='col-md-3 col-xs-6'>
      <div className='card bwm-card'>
        <Link to={`rentals/${rental._id}`}>
          <img className='card-img-top' src={rental.image} alt='' />
        </Link>
        <div className='card-block'>
          <h6 className={`card-subtitle ${rental.category}`}>
            {" "}
            {rentalType(rental.shared)} {rental.category}&#183;{" "}
            {rental.city}
          </h6>
          <h4 className='card-title'>{rental.title}</h4>
          <p className='card-text'>
            ${rental.dailyRate} &#183; Free Cancelation
          </p>
          <a href='' className='card-link'>
            More Info
          </a>
        </div>
      </div>
    </div>
  );
};

export default RentalCard;
