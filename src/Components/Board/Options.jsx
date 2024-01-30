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
    if ("style" in properties) {
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
    if ("underline" in properties) {
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
  // console.log(properties);
  return (
    <>
      {/* Pencil */}
      {tool === "pencil" && (
        <div className="flex items-center px-3">
          <span className="material-symbols-outlined">edit</span>
          <div className="border-black border-solid border-l-2 mx-2 w-1 h-6"></div>
          <ColourPalate />
          <div className="border-black border-solid border-l-2 mx-2 w-1 h-6"></div>
          <div className="flex items-center justify-center">
            <span className="font-semibold">Size: </span>
            <SizeBtn hw="p-[0.25rem]" size={1} />
            <SizeBtn hw="p-[0.4rem]" size={2} />
            <SizeBtn hw="p-[0.55rem]" size={3} />
            <SizeBtn hw="p-[0.7rem]" size={4} />
          </div>
        </div>
      )}
      {/* Pencil */}
      {/* Eraser */}
      {tool === "eraser" && (
        <div className="flex items-center px-3">
          <span className="material-symbols-outlined">ink_eraser</span>
          <div className="border-black border-solid border-l-2 mx-2 w-1 h-6"></div>
          <div className="flex items-center justify-center">
            <span className="font-semibold">Size: </span>
            <SizeBtn hw="p-[0.25rem]" size={5} />
            <SizeBtn hw="p-[0.4rem]" size={15} />
            <SizeBtn hw="p-[0.55rem]" size={30} />
            <SizeBtn hw="p-[0.7rem]" size={50} />
          </div>
          <div className="border-black border-solid border-l-2 mx-2 w-1 h-6"></div>
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
        <div className="flex items-center px-3">
          <span className="material-symbols-outlined">T</span>
          <div className="border-black border-solid border-l-2 mx-2 w-1 h-6"></div>
          <ColourPalate />
          <div className="border-black border-solid border-l-2 mx-2 w-1 h-6"></div>
          <div className="flex items-center justify-center">
            <span className="font-semibold underline">Font Size: </span>
            <TextSizeBtn font="text-xl" size={50} title="h1" />
            <TextSizeBtn font="text-lg" size={35} title="h2" />
            <TextSizeBtn font="text-base" size={25} title="h3" />
            <TextSizeBtn font="text-sm" size={10} title="h4" />
          </div>
          <div className="border-black border-solid border-l-2 mx-2 w-1 h-6"></div>
          <div className="flex items-center justify-center">
            <span className="font-semibold underline">Font Size: </span>
            <TextFontBtn style="font-sans" font="sans-serif" />
            <TextFontBtn style="font-serif" font="Times New Roman" />
            <TextFontBtn style="font-mono" font="Consolas" />
          </div>
          <div className="border-black border-solid border-l-2 mx-2 w-1 h-6"></div>
          <button
            className={`mx-1 text-lg font-bold border-black px-2 text-center  ${
              "fontWeight" in properties
                ? "border-t-2 border-l-2 "
                : "border-r-2 border-b-2"
            }`}
            onClick={textBold}
          >
            B
          </button>
          <button
            className={`mx-1 text-lg italic border-black px-2 text-center  ${
              "style" in properties
                ? "border-t-2 border-l-2"
                : "border-r-2 border-b-2"
            }`}
            onClick={textItalic}
          >
            I
          </button>
          <button
            className={`mx-1 text-lg underline border-black px-2 text-center  ${
              "underline" in properties
                ? "border-t-2 border-l-2"
                : "border-r-2 border-b-2"
            }`}
            onClick={underline}
          >
            U
          </button>
          <div className="border-black border-solid border-l-2 mx-2 w-1 h-6"></div>
          <button
            className={`mx-1 text-lg font-bold border-black px-2 text-center  ${
              properties.align === "left"
                ? "border-t-2 border-l-2 "
                : "border-r-2 border-b-2"
            }`}
            onClick={() => textAlign("left")}
          >
            <span class="material-symbols-outlined">format_align_left</span>
          </button>
          <button
            className={`mx-1 text-lg italic border-black px-2 text-center  ${
              properties.align === "center"
                ? "border-t-2 border-l-2"
                : "border-r-2 border-b-2"
            }`}
            onClick={() => textAlign("center")}
          >
            <span class="material-symbols-outlined">format_align_center</span>
          </button>
          <button
            className={`mx-1 text-lg underline border-black px-2 text-center  ${
              properties.align === "right"
                ? "border-t-2 border-l-2"
                : "border-r-2 border-b-2"
            }`}
            onClick={() => textAlign("right")}
          >
            <span class="material-symbols-outlined">format_align_right</span>
          </button>
        </div>
      )}
      {/* Text */}

      {/* Image */}
      {tool === "image" && (
        <div className="flex items-center px-3">
          <span className="material-symbols-outlined">image</span>
          <div className="border-black border-solid border-l-2 mx-2 w-1 h-6"></div>
          <ImageForm />
        </div>
      )}
      {/* Image */}

      {/* Image */}
      {tool === "shape" && (
        <div className="flex items-center px-3">
          <span className="material-symbols-outlined">shapes</span>
          <div className="border-black border-solid border-l-2 mx-2 w-1 h-6"></div>
          <button
            className={`mx-1 text-lg font-bold border-black px-2 text-center  ${
              properties.shape === "rectangle"
                ? "border-t-2 border-l-2 "
                : "border-r-2 border-b-2"
            }`}
            onClick={() => shape("rectangle")}
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
          <div className="border-black border-solid border-l-2 mx-2 w-1 h-6"></div>
          <ColourPalate />
        </div>
      )}
      {/* Image */}
    </>
  );
}
