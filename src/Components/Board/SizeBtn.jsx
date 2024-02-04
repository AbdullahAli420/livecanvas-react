import React from "react";
import { changeTool } from "../../stores/ToolStore";
import { useDispatch, useSelector } from "react-redux";

const SizeBtn = ({ size, hw }) => {
  const dispatch = useDispatch();
  const properties = useSelector((state) => state.ToolStore.properties);
  const tool = useSelector((state) => state.ToolStore.tool);
  return (
    <button
      className={`bg-black rounded-full flex ${hw} mx-1 ${
        properties.size === size ? "border-2 border-red-500" : ""
      }`}
      onClick={() =>
        dispatch(
          changeTool({ tool: tool, properties: { ...properties, size: size } })
        )
      }
    ></button>
  );
};

export default SizeBtn;
