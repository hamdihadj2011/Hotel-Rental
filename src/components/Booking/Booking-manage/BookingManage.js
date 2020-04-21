import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../../actions";
import { BookingCard } from "./BookingCard";
class BookingManage extends Component {

  state={
    pendingPayments:[]
  }
  componentDidMount() {
    this.props.dispatch(actions.fetchUserBookings());
    this.getPendingPayment()
  }

  getPendingPayment=()=>{
    actions.getPendingPayment()
      .then(pendingPayments=>{
        this.setState({
          pendingPayments
        })
      })
      .catch(err=>console.error(err))
  }

  renderBookig = (data) => {
    return data.map((booking) => <BookingCard booking={booking} />);
  };

  renderPayments=payments=>{
    // debugger
    return payments.map(payment=> <BookingCard 
                                      key={payment.id}
                                      booking={payment.booking} 
                                      payment={payment}

                                      />
                                  )
  }

  render() {
    const { data, isFetching } = this.props.userBookings;
    return (
      <>
        <section id='userBookings'>
          <h1 className='page-title'>My Bookings</h1>
          <div className='row'>{this.renderBookig(data)}</div>
          {!isFetching && data.length === 0 && (
            <div class='alert alert-warning'>
              You have no bookings created go to rentals section and book your
              place today.
              <Link
                style={{ "margin-left": "10px" }}
                class='btn btn-bwm'
                to='/rentals'
              >
                Available Rental
              </Link>
            </div>
          )}
        </section>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userBookings: state.userBookings,
  };
};
export default connect(mapStateToProps)(BookingManage);
