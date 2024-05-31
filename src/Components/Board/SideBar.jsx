import React from "react";
import CasualButton from "./CasualButton";

const SideBar = () => {
  return (
    <div className="absolute right-0 flex flex-col">
      {/* <CasualButton title="create" icon="add" /> */}
      <CasualButton title="manage" icon="manage_accounts" />
      <CasualButton title="options" icon="menu" />
      {/* <CasualButton title="layers" icon="layers" /> */}
      <CasualButton title="undo" icon="undo" />
      <CasualButton title="redo" icon="redo" />
      <CasualButton title="resize" icon="resize" />
    </div>
  );
};

export default SideBar;
