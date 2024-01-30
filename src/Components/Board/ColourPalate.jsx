import React from "react";
import ColorButton from "./colorButton.jsx";
const ColourPalate = () => {
  return (
    <div className="flex items-center">
      <span className="font-semibold">Color: </span>
      <ColorButton color="bg-black" name="black" />
      <ColorButton color="bg-red-500" name="red" />
      <ColorButton color="bg-blue-500" name="blue" />
      <ColorButton color="bg-green-500" name="green" />
    </div>
  );
};

export default ColourPalate;
