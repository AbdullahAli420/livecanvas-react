import React from "react";
import { changeTool } from "../../stores/ToolStore";
import { useDispatch, useSelector } from "react-redux";

const TextFontBtn = ({ style, font, title }) => {
  const dispatch = useDispatch();
  const FontNow = useSelector((state) => state.ToolStore.properties.font);
  const tool = useSelector((state) => state.ToolStore.tool);
  //   const properties = useSelector((state) => state.ToolStore.properties);

  return (
    <button
      className={`flex ${style} border border-solid border-black p-1 bg-slate-300 mx-1 ${
        FontNow === font ? "underline" : ""
      }`}
      onClick={() =>
        dispatch(changeTool({ tool: tool, properties: { font: font } }))
      }
    >
      {font}
    </button>
  );
};

export default TextFontBtn;
