import React from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { connect } from "react-redux";
import moment from "moment";
import { getRangeOfDate } from "../../helpers";
import { BookingModal } from "./BookingModal";
import * as actions from "../../actions";
class Booking extends React.Component {
  constructor() {
    super();
    this.bookedOutDates = [];
    this.state = {
      proposedBooking: {
        startAt: "",
        endAt: "",
        guests: 0
      },
      modal: {
        open: false,
      },
      errors: [],
    };
    this.dateRef = React.createRef();
  }
  componentWillMount() {
    this.getBookedOutDates();
  }
  getBookedOutDates = () => {
    const { bookings } = this.props.rental;

    if (bookings && bookings.length > 0) {
      bookings.forEach((booking) => {
        const dateRange = getRangeOfDate(
          booking.startAt,
          booking.endAt,
          "Y/MM/DD"
        );
        this.bookedOutDates.push(...dateRange);
      });
    }
  };
  checkInvalidDate = (date) => {
    return (
      this.bookedOutDates.includes(date.format("Y/MM/DD")) ||
      date.diff(moment(), "days") < 0
    );
  };

  handleApply = (event, picker) => {
    const startAt = picker.startDate.format("Y/MM/DD");
    const endAt = picker.endDate.format("Y/MM/DD");
    this.dateRef.current.value = startAt + " to " + endAt;
    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        startAt,
        endAt,
      },
    });

    console.log(this.state);
  };

  selectGuest = (e) => {
    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        guests: parseInt(e.target.value),
      },
    });
  };

  conformProposedData = () => {
    const { startAt, endAt } = this.state.proposedBooking;
    const days = getRangeOfDate(startAt, endAt, "Y/MM/DD").length - 1;
    const { rental } = this.props;
    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        days,
        totalPrice: days * rental.dailyRate,
        rental,
      },
      modal: {
        open: true,
      },
    });
    console.log(this.state);
  };

  cancelConfirmation = () => {
    this.setState({
      modal: {
        open: false,
      },
    });
  };
  addNewBookOutDates = (booking) => {
    const dateRange = getRangeOfDate(booking.startAt, booking.endAt);
    this.bookedOutDates.push(...dateRange);
  };
  resetData = () => {
    this.dateRef.current.value = "";
    this.setState({
      proposedBooking: { guests: "" },
    });
  };
  reserveRental = () => {
    
    actions.createBooking(this.state.proposedBooking).then(
      (booking) => {
        this.addNewBookOutDates(booking);
        this.cancelConfirmation();
        this.resetData();
        toast.success("Booking has been succesfult created ");
      },
      (errors) => {
        this.setState({
          errors
        });
      }
    );
  };
  
  render() {
    
    const {
      rental,
      auth: { isAuth },
    } = this.props;
    const { startAt, endAt, guests } = this.state.proposedBooking;
    return (
      <div className='booking'>
        <ToastContainer />
        <h3 className='booking-price'>
          $ {rental.dailyRate}{" "}
          <span className='booking-per-night'>per night</span>
        </h3>
        <hr></hr>
        {!isAuth && (
          <Link className='btn btn-bwm btn-confirm btn-block' to='/login'>
            Login to book place
          </Link>
        )}
        {isAuth && (
          <>
            <div className='form-group'>
              <label htmlFor='dates'>Dates</label>
              <DateRangePicker
                onApply={this.handleApply}
                opens='left'
                containerStyles={{ display: "block" }}
                isInvalidDate={this.checkInvalidDate}
              >
                <input
                  ref={this.dateRef}
                  id='dates'
                  type='text'
                  className='form-control'
                ></input>
              </DateRangePicker>
              ENDAR
            </div>
            <div className='form-group'>
              <label htmlFor='guests'>Guests</label>
              <input
                type='number'
                className='form-control'
                id='guests'
                aria-describedby='emailHelp'
                placeholder=''
                onChange={this.selectGuest}
                value={guests}
              ></input>
            </div>
            <button
              disabled={!startAt || !endAt || !guests}
              className='btn btn-bwm btn-confirm btn-block'
              onClick={this.conformProposedData}
            >
              Reserve place now
            </button>
          </>
        )}
        <hr></hr>
        <p className='booking-note-title'>
          People are interested into this house
        </p>
        <p className='booking-note-text'>
          More than 500 people checked this rental in last month.
        </p>

        <BookingModal
          closeModal={this.cancelConfirmation}
          open={this.state.modal.open}
          booking={this.state.proposedBooking}
          confirmModal={this.reserveRental}
          errors={this.state.errors}
          rentalPrice={rental.dailyRate}
          
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps)(Booking);
