import React from 'react';
import SpinnerIcon from "../assets/svg/Spinner.svg";

const SpinnerComponent = () => {
  return (
    <div className="bg-black bg-opacity-50 flex items-center justify-center fixed left-0 right-0 bottom-0 top-0 z-49">
      <div>
        <img src={SpinnerIcon} alt="Loading..." className="h-24" />
      </div>
    </div>
  );
}

export default SpinnerComponent;
