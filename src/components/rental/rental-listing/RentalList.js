import React, { Component } from "react";
import { connect } from "react-redux";
import RentalCard from "./rentalCard";
import * as actions from "../../../actions";
class RentalList extends Component {
  renderRentals = () =>
    this.props.rentals &&
    this.props.rentals.map((rental,id) => <RentalCard key={id} rental={rental} />);
  render() {
    return <div className='row'>{this.renderRentals()}</div>;
  }
}

export default RentalList;
