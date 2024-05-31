import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen absolute bg-black bg-opacity-50 z-40">
      <div
        className="absolute inline-block h-20 w-12 animate-spin rounded-full border-4 border-solid border-current order-e-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
      <div
        className="absolute inline-block h-12 w-20 animate-spin rounded-full border-4 border-solid border-current order-e-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default Loader;
