import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setResize } from "../../stores/ToolStore";
import { ResizeCanvas } from "../../stores/CanvasStore";
import ColourPalate from "./ColourPalate";
const CanvasSetting = () => {
  const resize = useSelector((state) => state.ToolStore.resize);
  const { board_width, board_height } = useSelector(
    (state) => state.CanvasStore.dimensions
  );
  console.log(board_width, board_height);
  const [width, setWidth] = useState(board_width);
  const [height, setHeight] = useState(board_height);
  const dispatch = useDispatch();
  return (
    <>
      {resize && (
        <>
          <div
            className="flex w-full absolute justify-center top-0 h-screen bg-gray-400 bg-opacity-20 cursor-pointer z-20"
            onClick={() => dispatch(setResize())}
          ></div>
          <div className="flex w-full absolute justify-center top-0 z-30">
            <div className="md:p-0 mt-2 md:px-3 block h-min top-3 bg-white text-black rounded- p-4 opacity border-solid border-[1px] border-black">
              <ColourPalate type="bg" />
              <div className="font-bold">Resize Canvas</div>
              <div className="py-2 flex justify-center">
                Width:{" "}
                <input
                  type="tel"
                  className="text-center mx-2 border-b-2 border-solid"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                />{" "}
                px
              </div>
              <div className="py-2 flex justify-center">
                Height:{" "}
                <input
                  type="tel"
                  className="text-center mx-2 border-b-2 border-solid"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />{" "}
                px
              </div>
              <div className="flex items-center m-2">
                <button
                  className="bg-green-700 hover:bg-green-900 text-white w-full px-2 py-1 rounded mx-3 "
                  onClick={() => {
                    dispatch(setResize());
                    dispatch(ResizeCanvas([width, height]));
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CanvasSetting;
