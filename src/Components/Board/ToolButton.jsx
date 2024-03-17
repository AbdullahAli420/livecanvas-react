import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTool } from "../../stores/ToolStore.js";

export default function ToolButton({ name, icon }) {
  const dispatch = useDispatch();
  const tool = useSelector((state) => state.ToolStore.tool);
  const properties = useSelector((state) => state.ToolStore.properties);

  return (
    <button
      className={`flex items-center justify-center p-2 m-2 hover:bg-gray-300 hover:text-black ${
        tool === name ? "bg-gray-600 text-white" : ""
      }`}
      onClick={() =>
        dispatch(
          changeTool({ tool: name, properties: { ...properties, src: null } })
        )
      }
    >
      <span className="material-symbols-outlined">{icon}</span>
    </button>
  );
}
