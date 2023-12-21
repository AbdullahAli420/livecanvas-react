import React from "react";

export default function ToolButton({ name, icon }) {
  return (
    <button className="">
      <span className="material-symbols-outlined">{icon}</span>
    </button>
  );
}
