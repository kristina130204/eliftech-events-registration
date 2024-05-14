import React from "react";

const Participant = ({ data }) => {
  return (
    <div className='block'>
      <h2 className='fullname'>{data.fullName}</h2>
      <h3 className='email'>{data.email}</h3>
    </div>
  );
};

export default Participant;
