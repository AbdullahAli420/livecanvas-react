import React, { useEffect, useState } from "react";
import CanvasSetting from "./CanvasSetting";
import Tools from "./Tools";
import Canvas from "./Canvas";
import Options from "./Options";
import SideBar from "./SideBar";
import Create from "./Create";
import Loader from "./Loader";
import UserManage from "./UserManage";
import { useSelector } from "react-redux";
import Viewer from "./Viewer";

const Board = (props) => {
  console.log(props);
  const [loading, setLoading] = useState(false);
  const [viewer, setViewer] = useState(false);
  const create = useSelector((state) => state.ToolStore.create);
  return (
    <>
      <Create setLoading={setLoading} setViewer={setViewer} />
      {loading && <Loader />}
      <div className="h-screen relative">
        <div className="text-3xl p-3">Live-Canvas React</div>
        {!viewer && !create && (
          <>
            <div className="flex border-solid border-black">
              <Tools />
              <Canvas />
              <SideBar />
              <CanvasSetting />
              <UserManage />
            </div>
            <Options />
            <Canvas />
          </>
        )}
        {viewer && <Viewer />}
      </div>
    </>
  );
};

export default Board;
