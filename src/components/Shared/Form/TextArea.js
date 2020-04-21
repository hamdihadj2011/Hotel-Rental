import React from 'react'
export const TextArea = ({
    input,
    label,
    type,
    rows,
    className,
    meta: { touched, error, warning },
  }) => (
    <div className='form-group'>
      <label>{label}</label>
      <div className='input-group'>
        <textarea rows={rows} {...input} type={type} className={className} ></textarea>
      </div>
      {touched && error && <div className='alert alert-danger'>{error}</div>}
    </div>
  );