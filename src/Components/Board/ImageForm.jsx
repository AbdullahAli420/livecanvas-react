import React, { useState, useRef, useEffect } from "react";
import { changeTool } from "../../stores/ToolStore";
import { useDispatch } from "react-redux";

const ImageForm = () => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const dispatch = useDispatch();
  const pictureInput = useRef(null);
  const imgElem = useRef(null);
  const [image, setImage] = useState(null);
  useEffect(() => {
    if (pictureInput !== null) {
      pictureInput.current.addEventListener("change", (target) => {
        if (pictureInput.current.files.length > 0) {
          const reader = new FileReader();
          reader.addEventListener("load", (reader) => {
            setImage(reader.currentTarget.result);
          });
          reader.readAsDataURL(pictureInput.current.files[0]);
        }
      });
    }
  });
  const AddPicture = () => {
    if (image !== null)
      dispatch(
        changeTool({
          tool: "image",
          properties: {
            src: image,
            width: width,
            height: height,
          },
        })
      );
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
      <img src="" ref={imgElem} className="hidden" />
    </div>
  );
};

export default ImageForm;
