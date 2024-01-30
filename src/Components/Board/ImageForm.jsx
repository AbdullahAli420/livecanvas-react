import React, { useState, useRef } from "react";
import { changeTool } from "../../stores/ToolStore";
import { useDispatch } from "react-redux";

const ImageForm = () => {
  const [height, setHeight] = useState(100);
  const [width, setWidth] = useState(100);
  const dispatch = useDispatch();
  const pictureInput = useRef(null);
  const AddPicture = () => {
    if (pictureInput.current.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", (reader) => {
        console.log(reader);
        dispatch(
          changeTool({
            tool: "image",
            properties: {
              src: reader.currentTarget.result,
              width: width >= 5 ? width : 100,
              height: height >= 5 ? height : 100,
            },
          })
        );
      });
      reader.readAsDataURL(pictureInput.current.files[0]);
    }
  };
  return (
    <div className="flex  justify-center items-center">
      <input type="file" accept="image/*" id="" ref={pictureInput} />
      W:{" "}
      <input
        type="tel"
        className="p-[0.2px] px-1 w-14 border-2 mx-1 border-solid border-black"
        value={width}
        onChange={(e) => setWidth(e.target.value)}
      />
      <span className="bold px-1 font-bold ">x </span> H:{" "}
      <input
        type="tel"
        className="p-[0.2px] px-1 w-14 border-2 mx-1 border-solid border-black"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-1 rounded ml-4"
        onClick={AddPicture}
      >
        Add
      </button>
    </div>
  );
};

export default ImageForm;
