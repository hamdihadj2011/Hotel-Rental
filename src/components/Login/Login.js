import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import LoginForm from "./LoginForm";
import * as actions from "../../actions";
class Login extends Component {
  loginUser = (userData) => {
    this.props.dispatch(actions.Login(userData));
  };
  render() {
    const { isAuth, errors } = this.props.auth;

    if (isAuth) {
      return <Redirect to={{ pathname: "/rentals" }} />;
    }
    return (
      <>
        <section id='login'>
          <div className='bwm-form'>
            <div className='row'>
              <div className='col-md-5'>
                <h1>Login</h1>
                <LoginForm submitCb={this.loginUser} errors={errors} />
              </div>
              <div className='col-md-6 ml-auto'>
                <div className='image-container'>
                  <h2 className='catchphrase'>
                    Hundreds of awesome places in reach of few clicks.
                  </h2>
                  <img src={process.env.PUBLIC_URL + '/images/login-image.jpg.jpg'} alt='' />
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Login);
