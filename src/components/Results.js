import React from "react";

const Results = ({data}) => {
  return (
    <div className='results__container'>
    <div className="content">
      <div className="title">
        <h6>{data[4]} - {data[5]}</h6>
        <h6>Email: {data[2]}</h6>
      </div>
      <div className="subtitle">{data[0]} - {data[3]}</div>
    </div>
    </div>
  );
};

export default Results;
