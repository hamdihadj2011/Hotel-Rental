import React from "react";

export function Error(props) {
  const errors = props.errors;

  return (
    errors.length > 0 && (
      <div className='alert alert-danger bwm-res-errors'>
        {errors.map((error, i) => (
          <p key={i}>{error.detail}</p>
        ))}
      </div>
    )
  );
}
