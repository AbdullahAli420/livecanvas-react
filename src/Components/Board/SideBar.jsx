import React from "react";
import CasualButton from "./CasualButton";

const SideBar = () => {
  return (
    <div className="absolute right-0 flex flex-col">
      <CasualButton title="options" icon="menu" />
      {/* <CasualButton title="layers" icon="layers" /> */}
      <CasualButton title="undo" icon="undo" />
      <CasualButton title="redo" icon="redo" />
      <CasualButton title="users" icon="manage_accounts" />
    </div>
  );
};

export default SideBar;
