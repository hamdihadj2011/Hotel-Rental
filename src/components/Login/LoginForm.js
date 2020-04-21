import React from "react";
import { Field, reduxForm } from "redux-form";
import {Input} from '../Shared/Form/input'
import {Error} from '../Shared/Form/Error'
import {required,minLength4} from '../Shared/Form/validator'

const LoginForm = (props) => {
  const { handleSubmit, pristine, submitCb, valid, submitting,errors } = props;
  return (
    <form onSubmit={handleSubmit(submitCb)}>
      <Field
        name='email'
        component='input'
        type='email'
        placeholder='Email'
        className='form-control'
        component={Input}
        label='Email'
        validate={[required,minLength4]}
      />
      <Field
        name='password'
        component='input'
        type='password'
        className='form-control'
        component={Input}
        label='Password'
        validate={[required]}
      />
      
        <button
          className='btn btn-bwm btn-form'
          type='submit'
          disabled={ !valid || pristine || submitting}
        >
          Login
        </button>
<Error errors={errors} />
    </form>
  );
};

// const validate = (values) => {
//   const errors = {};
//   if (values.username && values.username.length < 4) {
//     errors.username = "Username min length is 4";
//   }

//   if (!values.email) {
//     errors.email = "Please enter an email";
//   }

//   if (!values.passwordConfirmation) {
//     errors.passwordConfirmation = "Please enter Password Confirmation";
//   }

//   if (values.password !== values.passwordConfirmation) {
//     errors.password = "Password must been the same";
//   }
//   return errors;
// };

export default reduxForm({
  form: "loginForm", // a unique identifier for this form
//   validate,
})(LoginForm);
