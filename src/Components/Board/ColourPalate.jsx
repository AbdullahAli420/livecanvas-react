import React from "react";
import ColorButton from "./colorButton.jsx";
const ColourPalate = (props) => {
  return (
    <div className="flex items-center">
      <span className="font-semibold">Color: </span>
      <ColorButton color="bg-white" name="white" type={props.type} />
      <ColorButton color="bg-black" name="black" type={props.type} />
      <ColorButton color="bg-red-500" name="red" type={props.type} />
      <ColorButton color="bg-blue-500" name="blue" type={props.type} />
      <ColorButton color="bg-green-500" name="green" type={props.type} />
    </div>
  );
};

export default ColourPalate;
