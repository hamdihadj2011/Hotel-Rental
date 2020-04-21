import React from "react";
import { Link, withRouter } from "react-router-dom";
import RentalSearchInput from "../components/rental/RentalSearchInput";
import { connect } from "react-redux";
class Header extends React.Component {
  handleLogout = () => {
    this.props.logout();
    this.props.history.push("/login");
  };

  renderAuthButton() {
    const { isAuth } = this.props.auth;
    console.log(isAuth);
    if (isAuth) {
      return (
        <>
          <Link className='nav-item nav-link'>{this.props.auth.username}</Link>
          <div className='nav-item dropdown'>
            <a
              className='nav-link nav-item dropdown-toggle'
              href='#'
              id='navbarDropdownMenuLink'
              data-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'
            >
              Owner Section
            </a>
            <div
              className='dropdown-menu'
              aria-labelledby='navbarDropdownMenuLink'
            >
              <Link className='dropdown-item' to='/rentals/new'>
                Create Rental
              </Link>
              <Link className='dropdown-item' to='/rentals/manage'>
                Manage Rentals
              </Link>
              <Link className='dropdown-item' to='/bookings/manage'>
                Manage Bookings
              </Link>
            </div>
          </div>
          <a
            className='nav-item nav-link clickable'
            onClick={this.handleLogout}
          >
            Logout
          </a>
        </>
      );
    } else {
      return (
        <>
          <Link className='nav-item nav-link active' to='/login'>
            Login{" "}
          </Link>
          <Link className='nav-item nav-link' to='/register'>
            Register
          </Link>
        </>
      );
    }
  }
  render() {
    return (
      <nav className='navbar navbar-dark navbar-expand-lg'>
        <div className='container'>
          <Link to='/rentals' className='navbar-brand' href=''>
             Rental Hotel
          </Link>
          <RentalSearchInput />

          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarNavAltMarkup'
            aria-controls='navbarNavAltMarkup'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
            <div className='navbar-nav ml-auto'>{this.renderAuthButton()}</div>
          </div>
        </div>
      </nav>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default withRouter(connect(mapStateToProps)(Header));
