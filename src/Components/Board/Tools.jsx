import React from "react";
import ToolButton from "./ToolButton";

export default function Tools() {
  return (
    <div>
      <h3>Tools</h3>
      <div className="flex flex-col">
        <ToolButton icon="edit" />
        <ToolButton icon="shapes" />
        <ToolButton icon="sticky_note" />
        <ToolButton icon="T" />
        <ToolButton icon="image" />
      </div>
    </div>
  );
}
