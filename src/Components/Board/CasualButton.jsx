import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOperation } from "../../stores/CanvasStore";

export default function CasualButton({ title, icon }) {
  const CanvasStore = useSelector((state) => state.CanvasStore);
  const dispatch = useDispatch();
  return (
    <button
      className="rounded-full bg-gray-400 p-2 bg-opacity-60 flex m-1"
      onClick={() => {
        if (title === "undo") {
          dispatch(setOperation(1));
        } else if (title === "redo") dispatch(setOperation(2));
      }}
    >
      <span className="material-symbols-outlined">{icon}</span>
    </button>
  );
}
