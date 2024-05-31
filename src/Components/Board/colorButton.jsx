import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeColor } from "../../stores/ToolStore.js";
import { CanvasBackground } from "../../stores/CanvasStore.js";

const ColorButton = ({ color, name, type }) => {
  const dispatch = useDispatch();
  const color_slice = useSelector((state) => state.ToolStore.color);
  const background = useSelector((state) => state.CanvasStore.background);
  return (
    <button
      className={`${color} flex h-4 w-4 mx-2 ${
        color_slice === name && type !== "bg" ? "border-black border-2" : ""
      } ${
        background === name && type === "bg"
          ? "border-black border-[2px]"
          : "border-yellow-800"
      } `}
      onClick={() => {
        if (type === "bg") {
          dispatch(CanvasBackground(name));
        } else {
          dispatch(changeColor(name));
        }
      }}
    ></button>
  );
};

export default ColorButton;
