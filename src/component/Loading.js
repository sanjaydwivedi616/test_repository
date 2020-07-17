import React from 'react';
import loadding from "../images/Loading.gif"

const Loading = () => {
  return (
    <div className="loader-img">
      <img src={loadding} />
    </div>
  );
}

export default Loading;