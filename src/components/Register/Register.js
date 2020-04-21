import React, { Component } from "react";
import {Redirect} from 'react-router-dom'
import RegisterForm from './RegisterForm'
import * as actions from '../../actions'
class Register extends Component {
  state={
      errors:[],
      redirect:false
  }

  registerUser=(userData)=>{
    actions.register(userData).then((registered)=>{
      this.setState({
        redirect:true
      })
    },(errors)=>{
      this.setState({errors})
    })
  }
  render() {
    const {errors,redirect}=this.state

    if(redirect){
      return <Redirect to={{pathname:'/login',state:{succesRegister:true}}} />
    }
    return (
      <section id='register'>
        <div className='bwm-form'>
          <div className='row'>
            <div className='col-md-5'>
              <h1>Register</h1>
              <RegisterForm submitCb={this.registerUser} errors={errors} />
            </div>
            <div className='col-md-6 ml-auto'>
              <div className='image-container'>
                <h2 className='catchphrase'>
                  As our member you have access to most awesome places in the
                  world.
                </h2>
                <img src={process.env.PUBLIC_URL + '/images/register-image.jpg.jpg'} alt='' />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Register;
