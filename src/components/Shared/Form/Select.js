import React from "react";
export const Select = ({
  input,
  label,
  type,
  className,
  options,
  meta: { touched, error, warning },
}) => {

    const renderOptions=option=>(
        options &&
            options.map((option) => (
               (
                <option key={option.i} value={option}>
                  {option}
                </option>
              )
            ))
    )
  return (
    <div className='form-group'>
      <label>{label}</label>
      <div className='input-group'>
        <select {...input} type={type} className={className}>
          {renderOptions()}
        </select>
      </div>
      {touched && error && <div className='alert alert-danger'>{error}</div>}
    </div>
  );
};
