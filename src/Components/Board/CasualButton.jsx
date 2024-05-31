import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOperation } from "../../stores/CanvasStore";
import {
  setOptions,
  setResize,
  setCreate,
  setManage,
} from "../../stores/ToolStore";

export default function CasualButton({ title, icon }) {
  const dispatch = useDispatch();
  return (
    <button
      className="rounded-full bg-gray-400 p-2 bg-opacity-60 flex m-1"
      onClick={() => {
        if (title === "undo") {
          dispatch(setOperation(1));
        } else if (title === "redo") dispatch(setOperation(2));
        else if (title === "options") dispatch(setOptions());
        else if (title === "resize") dispatch(setResize());
        else if (title === "create") dispatch(setCreate());
        else if (title === "manage") dispatch(setManage());
      }}
    >
      <span className="material-symbols-outlined">{icon}</span>
    </button>
  );
}
