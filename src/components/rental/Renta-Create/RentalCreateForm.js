import React from "react";
import { Field, reduxForm } from "redux-form";
import { Input } from "../../Shared/Form/input";
import { TextArea } from "../../Shared/Form/TextArea";
import { Select } from "../../Shared/Form/Select";
import FileUpload from "../../Shared/Form/FileUpload";
import {Error} from '../../Shared/Form/Error'
// import {Error} from '../Shared/Form/Error'
// import {required,minLength4} from '../Shared/Form/validator'

const RentalCreateForm = (props) => {
  const {
    handleSubmit,
    pristine,
    submitCb,
    valid,
    options,
    submitting,
    errors
  } = props;
  
  return (
    <form onSubmit={handleSubmit(submitCb)}>
      <Field
        name='title' 
        component={Input}
        label='Title'
        className='form-control'
        // validate={[required,minLength4]}
      />
      <Field
        name='description'
        type='text'
        className='form-control'
        component={TextArea}
        rows='6'
        label='Description'
        // validate={[required,minLength4]}
      />
      <Field
        name='city'
        type='text'
        className='form-control'
        component={Input}
        label='City'
        // validate={[required]}
      />
      <Field
        name='street'
        type='text'
        className='form-control'
        component={Input}
        label='Street'
        // validate={[required]}
      />
      <Field
        name='image'
        className='form-control'
        component={FileUpload}
        label='Image'
        // validate={[required]}
      />

      <Field
        name='category'
        className='form-control'
        component={Select}
        label='Category'
        options={options}
        // validate={[required]}
      />

      <Field
        name='bedrooms'
        type='number'
        className='form-control'
        component={Input}
        label='Bedrooms'
        // validate={[required]}
      />
      <Field
        name='dailyRate'
        type='text'
        className='form-control'
        component={Input}
        symbol='$'
        label='DailyRate'
        // validate={[required]}
      />
      <Field
        name='shared'
        type='checkbox'
        // className='form-control'
        component={Input}
        label='Shared'
        // validate={[required]}
      />

      <button
        className='btn btn-bwm btn-form'
        type='submit'
        disabled={!valid || pristine || submitting}
      >
        Create Rental
      </button>
      <Error errors={errors} />
    </form>
  );
};

export default reduxForm({
  form: "rentalCreateForm", // a unique identifier for this form
  //   validate,
  initialValues:{shared:false,category:'apartment'}
})(RentalCreateForm);
