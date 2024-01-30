import React from "react";
import Tools from "./Tools";
import Canvas from "./Canvas";
import Options from "./Options";
import SideBar from "./SideBar";

const Board = (props) => {
  return (
    <div className="h-screen">
      <div className="text-2xl">WhiteBoard</div>
      <div className="flex border-solid border-black">
        <Tools />
        <Canvas />
        <SideBar />
      </div>
      <Options />
    </div>
  );
};

export default Board;
