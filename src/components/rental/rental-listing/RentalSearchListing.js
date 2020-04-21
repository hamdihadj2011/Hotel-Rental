import React, { Component } from "react";
import { connect } from "react-redux";
import RentalList from "./RentalList";
import * as actions from "../../../actions";

class RentalListingSearch extends Component {
  state = {
    searchedCity: "",
  };

  componentWillMount() {
   this.searchRentalsByCity()
  }
  componentDidUpdate(prevProps){
    const currentUrlParam=this.props.match.params.city
    const prevUrlParam=prevProps.match.params.city
    if(currentUrlParam !==prevUrlParam){
        this.searchRentalsByCity()
    }
  }
searchRentalsByCity=()=>{
    const searchedCity = this.props.match.params.city;
    this.setState({
      searchedCity,
    });
    this.props.dispatch(actions.fetchRentals(searchedCity));
}
  renderTitle = () => {
    const { errors, data } = this.props.rentals;
    const { searchedCity } = this.state;

    let title = "";
    if (errors.length > 0) {
      title = `ther are no rental for ${searchedCity}`;
    } else {
      title = `Your Home in City of ${searchedCity}`;
    }

    return <h1 className='page-title'>{title}</h1>;
  };
  render() {
    return (
      <div>
        <section id='rentalListing'>
          {this.renderTitle()}
          <RentalList rentals={this.props.rentals.data} />
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    rentals: state.rentals,
  };
};

export default connect(mapStateToProps)(RentalListingSearch);
