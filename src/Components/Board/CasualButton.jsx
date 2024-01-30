import React from "react";

export default function CasualButton({ name, icon }) {
  return (
    <button className="rounded-full bg-gray-400 p-2 bg-opacity-60 flex m-1">
      <span className="material-symbols-outlined">{icon}</span>
    </button>
  );
};
