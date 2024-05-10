import React from "react";
import ColourPalate from "./ColourPalate";
import SizeBtn from "./SizeBtn";
import { useSelector, useDispatch } from "react-redux";
import TextSizeBtn from "./TextSizeBtn";
import TextFontBtn from "./TextFontButton";
import ToolStore, { changeTool } from "../../stores/ToolStore";
import ImageForm from "./ImageForm";
import TextStyleBtn from "./TextStyleBtn";

export default function Options() {
  const tool = useSelector((state) => state.ToolStore.tool);
  const editable = useSelector((state) => state.ToolStore.editable);
  const properties = useSelector((state) => state.ToolStore.properties);
  const dispatch = useDispatch();
  const textBold = () => {
    if ("fontWeight" in properties) {
      const props = { ...properties };
      delete props.fontWeight;
      dispatch(
        changeTool({
          tool: tool,
          properties: props,
        })
      );
    } else {
      dispatch(
        changeTool({
          tool: tool,
          properties: { ...properties, size: "", fontWeight: "700" },
        })
      );
    }
  };
  const textItalic = () => {
    if ("style" in properties && "style" === "italic") {
      const props = { ...properties };
      delete props.style;
      dispatch(
        changeTool({
          tool: tool,
          properties: props,
        })
      );
    } else {
      dispatch(
        changeTool({
          tool: tool,
          properties: { ...properties, size: "", style: "italic" },
        })
      );
    }
  };
  const underline = () => {
    if ("underline" in properties && properties.underline === true) {
      const props = { ...properties };
      delete props.underline;
      dispatch(
        changeTool({
          tool: tool,
          properties: props,
        })
      );
    } else {
      dispatch(
        changeTool({
          tool: tool,
          properties: { ...properties, size: "", underline: true },
        })
      );
    }
  };

  const textAlign = (align) => {
    if ("align" in properties && properties.align === align) {
      const props = { ...properties };
      delete props.align;
      dispatch(
        changeTool({
          tool: tool,
          properties: props,
        })
      );
    } else {
      dispatch(
        changeTool({
          tool: tool,
          properties: { ...properties, size: "", align: align },
        })
      );
    }
  };

  const shape = (shape) => {
    if ("shape" in properties && properties.shape === shape) {
      const props = { ...properties };
      delete props.shape;
      dispatch(
        changeTool({
          tool: tool,
          properties: props,
        })
      );
    } else {
      dispatch(
        changeTool({
          tool: tool,
          properties: { ...properties, size: "", shape: shape },
        })
      );
    }
  };

  return (
    <>
      {/* Selection */}
      {tool === "selection" && (
        <div className="lg:flex items-center px-3 block absolute bg-white left-16 top-16">
          <span className="material-symbols-outlined">arrow_selector_tool</span>
          <div className="border-black border-solid border-l-2 mx-2 w-1 h-6 invisible"></div>
          <ColourPalate />
          <div className="border-black border-solid border-l-2 mx-2 w-1 h-6 invisible"></div>
        </div>
      )}
      {tool === "pencil" && (
        <div className="lg:flex items-center px-3 block absolute bg-white left-16 top-16">
          <span className="material-symbols-outlined">edit</span>
          <div className="border-black border-solid border-l-2 mx-2 w-1 h-6 invisible"></div>
          <ColourPalate />
          <div className="border-black border-solid border-l-2 mx-2 w-1 h-6 invisible"></div>
          <div className="flex items-center justify-center">
            <span className="font-semibold">Size: </span>
            <SizeBtn hw="p-[0.25rem]" size={2} />
            <SizeBtn hw="p-[0.4rem]" size={3} />
            <SizeBtn hw="p-[0.55rem]" size={4} />
            <SizeBtn hw="p-[0.7rem]" size={6} />
          </div>
        </div>
      )}
      {/* Selection */}
      {/* Eraser */}
      {tool === "eraser" && (
        <div className="lg:flex items-center px-3 block absolute bg-white left-16 top-16">
          <span className="material-symbols-outlined">ink_eraser</span>
          <div className="border-black border-solid border-l-2 mx-2 w-1 h-6 invisible"></div>
          <div className="flex items-center justify-center">
            <span className="font-semibold">Size: </span>
            <SizeBtn hw="p-[0.25rem]" size={5} />
            <SizeBtn hw="p-[0.4rem]" size={15} />
            <SizeBtn hw="p-[0.55rem]" size={30} />
            <SizeBtn hw="p-[0.7rem]" size={50} />
          </div>
          <div className="border-black border-solid border-l-2 mx-2 w-1 h-6 invisible"></div>
          <button
            className={`flex justify-center items-center p-1 border-2 border-transparent  ${
              properties.mode == "remover"
                ? "bg-slate-400 text-white border-black"
                : ""
            }`}
            onClick={() => {
              if (properties.mode === "remover")
                dispatch(
                  changeTool({
                    tool: tool,
                    properties: { size: 15 },
                  })
                );
              else
                dispatch(
                  changeTool({
                    tool: tool,
                    properties: { mode: "remover" },
                  })
                );
            }}
          >
            <span className="material-symbols-outlined">delete</span>
          </button>
        </div>
      )}
      {/* Eraser */}
      {/* Text */}
      {tool === "text" && (
        <div className="lg:flex items-center px-3 block absolute bg-white left-16 top-16">
          <span className="material-symbols-outlined">T</span>
          <div className="border-black border-solid border-l-2 mx-2 w-1 h-6 invisible"></div>
          <ColourPalate />
          <div className="border-black border-solid border-l-2 mx-2 w-1 h-6 invisible"></div>
          <div className="flex items-center justify-center">
            {/* <span className="font-semibold underline">Font Size: </span> */}
            <select
              onChange={(e) => {
                dispatch(
                  changeTool({
                    tool: tool,
                    properties: { ...properties, size: e.target.value },
                  })
                );
              }}
              className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option value="50" className="flex text-xl mx-1">
                H1
              </option>
              <option value="35" className="flex text-lg mx-1">
                H2
              </option>
              <option value="25" className="flex text-base mx-1">
                H3
              </option>
              <option value="12" className="flex text-sm mx-1">
                H4
              </option>
            </select>
          </div>
          <div className="border-black border-solid border-l-2 mx-2 w-1 h-6 invisible"></div>
          <div className="flex items-center justify-center">
            {/* <span className="font-semibold underline">Font Style: </span> */}
            <select
              onChange={(e) =>
                dispatch(
                  changeTool({
                    tool: tool,
                    properties: { font: e.target.value },
                  })
                )
              }
              className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option
                value="sans-serif"
                className="flex font-sans text-xl mx-1"
              >
                sans-serif
              </option>
              <option
                value="Times New Roman"
                className="flex font-serif text-xl mx-1"
              >
                Times New Roman
              </option>
              <option value="Consolas" className="flex font-mono text-xl mx-1">
                Consolas
              </option>
            </select>
          </div>
          <div className="border-black border-solid border-l-2 mx-2 w-1 h-6 invisible"></div>
          <button
            className={`mx-1 text-lg font-bold border-black px-2 text-center  ${
              "fontWeight" in properties && properties.fontWeight === "700"
                ? "border-t-2 border-l-2 "
                : "border-r-2 border-b-2"
            }`}
            onClick={textBold}
          >
            B
          </button>
          <button
            className={`mx-1 text-lg italic border-black px-2 text-center  ${
              "style" in properties && properties.style === "italic"
                ? "border-t-2 border-l-2"
                : "border-r-2 border-b-2"
            }`}
            onClick={textItalic}
          >
            I
          </button>
          <button
            className={`mx-1 text-lg underline border-black px-2 text-center  ${
              "underline" in properties && properties.underline === true
                ? "border-t-2 border-l-2"
                : "border-r-2 border-b-2"
            }`}
            onClick={underline}
          >
            U
          </button>
          <div className="border-black border-solid border-l-2 mx-2 w-1 h-6 invisible"></div>
          <button
            className={`mx-1 text-lg font-bold border-black px-2 text-center  ${
              properties.align === "left"
                ? "border-t-2 border-l-2 "
                : "border-r-2 border-b-2"
            }`}
            onClick={() => textAlign("left")}
          >
            <span className="material-symbols-outlined">format_align_left</span>
          </button>
          <button
            className={`mx-1 text-lg italic border-black px-2 text-center  ${
              properties.align === "center"
                ? "border-t-2 border-l-2"
                : "border-r-2 border-b-2"
            }`}
            onClick={() => textAlign("center")}
          >
            <span className="material-symbols-outlined">
              format_align_center
            </span>
          </button>
          <button
            className={`mx-1 text-lg underline border-black px-2 text-center  ${
              properties.align === "right"
                ? "border-t-2 border-l-2"
                : "border-r-2 border-b-2"
            }`}
            onClick={() => textAlign("right")}
          >
            <span className="material-symbols-outlined">
              format_align_right
            </span>
          </button>
        </div>
      )}
      {/* Text */}

      {/* Image */}
      {tool === "image" && (
        <div className="lg:flex items-center px-3 block absolute bg-white left-16 top-16">
          <span className="material-symbols-outlined">image</span>
          <div className="border-black border-solid border-l-2 mx-2 w-1 h-6 invisible"></div>
          <ImageForm />
        </div>
      )}
      {/* Image */}

      {/* Image */}
      {tool === "shape" && (
        <div className="lg:flex items-center px-3 block absolute bg-white left-16 top-16">
          <span className="material-symbols-outlined">shapes</span>
          <div className="border-black border-solid border-l-2 mx-2 w-1 h-6 invisible"></div>
          <button
            className={`mx-1 text-lg font-bold border-black px-2 text-center  ${
              properties.shape === "rect"
                ? "border-t-2 border-l-2 "
                : "border-r-2 border-b-2"
            }`}
            onClick={() => shape("rect")}
          >
            <span className="material-symbols-outlined">rectangle</span>
          </button>
          <button
            className={`mx-1 text-lg font-bold border-black px-2 text-center  ${
              properties.shape === "circle"
                ? "border-t-2 border-l-2 "
                : "border-r-2 border-b-2"
            }`}
            onClick={() => shape("circle")}
          >
            <span className="material-symbols-outlined">circle</span>
          </button>
          <button
            className={`mx-1 text-lg font-bold border-black px-2 text-center  ${
              properties.shape === "triangle"
                ? "border-t-2 border-l-2 "
                : "border-r-2 border-b-2"
            }`}
            onClick={() => shape("triangle")}
          >
            <span className="material-symbols-outlined">change_history</span>
          </button>
          <button
            className={`mx-1 text-lg font-bold border-black px-2 text-center  ${
              properties.shape === "ellipse"
                ? "border-t-2 border-l-2 "
                : "border-r-2 border-b-2"
            }`}
            onClick={() => shape("ellipse")}
          >
            <span className="material-symbols-outlined transform scale-y-75 ">
              circle
            </span>
          </button>
          <button
            className={`mx-1 text-lg font-bold border-black px-2 text-center  ${
              properties.shape === "line"
                ? "border-t-2 border-l-2 "
                : "border-r-2 border-b-2"
            }`}
            onClick={() => shape("line")}
          >
            <span className="material-symbols-outlined transform rotate-45 scale-125 ">
              horizontal_rule
            </span>
          </button>
          {properties.shape === "line" && (
            <>
              <div className="border-black border-solid border-l-2 mx-2 w-1 h-6 invisible"></div>
              <div className="flex items-center justify-center">
                <span className="font-semibold">Size: </span>
                <SizeBtn hw="p-[0.25rem]" size={1} />
                <SizeBtn hw="p-[0.4rem]" size={2} />
                <SizeBtn hw="p-[0.55rem]" size={6} />
                <SizeBtn hw="p-[0.7rem]" size={12} />
              </div>
            </>
          )}
          <div className="border-black border-solid border-l-2 mx-2 w-1 h-6 invisible"></div>
          <ColourPalate />
        </div>
      )}
      {/* Image */}
    </>
  );
}
