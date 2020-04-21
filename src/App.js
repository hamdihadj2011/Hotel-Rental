import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import * as redux from "redux";
import { Provider } from "react-redux";
import "./App.css";
import Header from "./Shared/Header";
import RentalListing from "./components/rental/rental-listing/RentalListing";
import RentalSearchListing from "./components/rental/rental-listing/RentalSearchListing";
import RentalDetail from "./components/rental/rental-detail/RentalDetail";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import RentalCreate from "./components/rental/Renta-Create/RentalCreate";
import { ProtectedRoute } from "./components/Shared/Auth/ProtectedRoutes";
import { LoggedInRoute } from "./components/Shared/Auth/LoggedInRoute";
import RentalManage from "./components/rental/Rental-Manage/RentalManage";
import BookingManage from "./components/Booking/Booking-manage/BookingManage";
import * as actions from "./actions";
import { StripeProvider } from "react-stripe-elements";

const store = require("./reducers").init();
class App extends Component {
  componentWillMount() {
    store.dispatch(actions.checkAuth());
  }
  logout() {
    store.dispatch(actions.Logout());
  }
  render() {
    return (
      <StripeProvider apiKey="pk_test_SUgMjx6OyVCjF5VWebXWywUK00y9E86HpZ">
        <Provider store={store}>
          <Router>
            <div className='App'>
              <Header logout={this.logout} />

              <div className='container'>
                <Switch>
                  <Route
                    exact
                    path='/'
                    render={() => <Redirect to='/rentals' />}
                  />
                  <Route exact path='/rentals' component={RentalListing} />
                  <Route
                    exact
                    path='/rentals/:city/homes'
                    component={RentalSearchListing}
                  />
                  <ProtectedRoute
                    exact
                    path='/rentals/manage'
                    component={RentalManage}
                  />
                  <ProtectedRoute
                    exact
                    path='/bookings/manage'
                    component={BookingManage}
                  />
                  <ProtectedRoute
                    exact
                    path='/rentals/new'
                    component={RentalCreate}
                  />
                  <Route exact path='/rentals/:id' component={RentalDetail} />

                  <Route exact path='/login' component={Login} />
                  <LoggedInRoute exact path='/register' component={Register} />
                </Switch>
              </div>
            </div>
          </Router>
        </Provider>
      </StripeProvider>
    );
  }
}

export default App;
