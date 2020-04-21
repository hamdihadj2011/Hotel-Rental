import React from 'react'
import {Link } from 'react-router-dom'
import {prtifyDate,toUpperCase} from '../../../helpers'
export function BookingCard({booking}){
  
return (
    <div className='col-md-4' key={booking._id}>
          <div className='card text-center'>
            <div className='card-header'>{booking.rental ? booking.rental.category :'Deleted Rental'}</div>
            <div className='card-block'>
              <h4 className='card-title'> {booking.rental && booking.rental.title} - {booking.rental && toUpperCase(booking.rental.city)}</h4>
              <p className='card-text booking-desc'>{booking.rental && booking.rental.description}</p>
              <p className='card-text booking-days'>
                {prtifyDate(booking.startAt)} - {prtifyDate(booking.endAt)} | {booking.days} days
              </p>
              <p className='card-text booking-price'>
                <span>Price: </span>{" "}
                <span className='booking-price-value'>{booking.rental && booking.rental.dailyRate} $</span>
              </p>
              <Link className='btn btn-bwm' to={`/rentals/${booking.rental && booking.rental._id}`}>
                Go to Rental
              </Link>
            </div>
            <div className='card-footer text-muted'>Created {booking.createdAt}</div>
          </div>
        </div>
)
}