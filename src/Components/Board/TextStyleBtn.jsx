import React from "react";
import { changeTool } from "../../stores/ToolStore";
import { useDispatch, useSelector } from "react-redux";

const TextStyleBtn = ({ title, style, styleClass }) => {
  const dispatch = useDispatch();
  const styleNow = useSelector((state) => state.ToolStore.properties.styleNow);
  const tool = useSelector((state) => state.ToolStore.tool);
  const properties = useSelector((state) => state.ToolStore.properties);
  return (
    <button
      className={`flex ${styleClass} mx-1 ${
        styleNow === style ? "underline" : ""
      }`}
      onClick={() =>
        dispatch(
          changeTool({
            tool: tool,
            properties: { ...properties, size: "", style: style },
          })
        )
      }
    >
      {title}
    </button>
  );
};

export default TextStyleBtn;
