import React from "react";

const Hero = () => {
  return (
    <div className="bg-gray-800 text-white p-8">
      <h1 className="text-4xl font-bold">Welcome to LiveCanvas!</h1>
      <p className="mt-4">
        Explore the world of dynamic web design with React and Tailwind CSS.
      </p>
      <div className="mt-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded">
          Login
        </button>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Hero;
