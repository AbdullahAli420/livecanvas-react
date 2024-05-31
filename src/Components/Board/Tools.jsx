import React from "react";
import ToolButton from "./ToolButton";

export default function Tools() {
  return (
    <div className="m-1">
      <h3 className="underline font-semibold text-center">Tools</h3>
      <div className="flex flex-col">
        <ToolButton name="selection" icon="arrow_selector_tool" />
        <ToolButton name="pencil" icon="edit" />
        <ToolButton name="eraser" icon="ink_eraser" />
        <ToolButton name="shape" icon="shapes" />
        {/* <ToolButton name="stickynote" icon="sticky_note" /> */}
        <ToolButton name="text" icon="T" />
        <ToolButton name="image" icon="image" />
      </div>
    </div>
  );
}
