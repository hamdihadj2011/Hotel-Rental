import React, { Component } from "react";
import { Modal } from "react-responsive-modal";
import {prtifyDate} from '../../../helpers'
class RentalManageModal extends Component {
  state = {
    open: false,
  };

  openModal = () => {
    this.setState({
      open: true,
    });
  };

  closeModal = () => {
    this.setState({
      open: false,
    });
  };

  renderBookings = (bookings,rental) => {
      
    return bookings.map((booking) => (
      <React.Fragment key={booking.i}>
        <p>
          <span>Date:</span> {prtifyDate(booking.startAt)} - {prtifyDate(booking.endAt)}
        </p>
        <p>
          <span>Guests:</span> {booking.guests}
        </p>
        <p>
          <span>Total Price:</span> {booking.guests * rental.dailyRate} $
        </p>
        <hr></hr>
      </React.Fragment>
    ));
  };
  render() {
    const { open } = this.state;
    const {bookings,rental}=this.props
    return (
      <React.Fragment>
        <button type='button' onClick={this.openModal} className='btn btn-bwm'>
          Bookings
        </button>
        <Modal
          open={open}
          onClose={this.closeModal}
          little
          classNames={{ modal: "rental-booking-modal" }}
        >
          <h4 className='modal-title title'>Made Bookings</h4>
          <div className='modal-body bookings-inner-container'>
            {this.renderBookings(bookings,rental)}
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              onClick={this.closeModal}
              className='btn btn-bwm'
            >
              Cancel
            </button>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

export default RentalManageModal;
