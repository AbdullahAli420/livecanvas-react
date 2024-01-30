import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeColor } from "../../stores/ToolStore.js";

const ColorButton = ({ color, name }) => {
  const dispatch = useDispatch();
  const color_slice = useSelector((state) => state.ToolStore.color);
  return (
    <button
      className={`${color} flex h-4 w-4 mx-2 ${
        color_slice === name ? "border-black border-2" : ""
      }`}
      onClick={() => {
        dispatch(changeColor(name));
      }}
    ></button>
  );
};

export default ColorButton;
