import React from "react";
import CasualButton from "./CasualButton";
import Tools from "./Tools";
import Canvas from "./Canvas";

const Board = (props) => {
  return (
    <div>
      <div>Title</div>
      <div className="flex border-solid border-black">
        <Tools />
        <Canvas />
        <div>
          <CasualButton title="layers" icon="layers" />
          <CasualButton title="redo" icon="redo" />
          <CasualButton title="undo" icon="undo" />
        </div>
      </div>
    </div>
  );
};

export default Board;
