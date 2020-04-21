import React from "react";
import { Modal } from "react-responsive-modal";
import {Error} from '../Shared/Form/Error'
import "react-responsive-modal/styles.css";
export function BookingModal(props) {
  const { open, closeModal,booking,errors,rentalPrice } = props;
  return (
    <Modal
      open={open}
      onClose={closeModal}
      little
      classNames={{ modal: "booking-modal" }}
    >
      <h4 className='modal-title title'>Confirm Booking </h4>
      <p className='dates'>{booking.startAt} /{booking.endAt}</p>
      <div className='modal-body'>
        <em>{booking.days}</em> nights /<em>{rentalPrice}</em> per Night
        <p>
          Guests: <em>{booking.guests}</em>
        </p>
        <p>
          Price: <em>{booking.totalPrice} $</em>
        </p>
        
        <p>Do you confirm your booking for selected days?</p>
      </div>
      <Error errors={errors} />
      <div className='modal-footer'>
        <button  type='button' className='btn btn-bwm' onClick={props.confirmModal}>
          Confirm
        </button>
        <button type='button' onClick={closeModal} className='btn btn-bwm'>
          Cancel
        </button>
      </div>
    </Modal>
  );
}
