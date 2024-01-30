/* eslint-disable */
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveState } from "../../stores/CanvasStore";
import { changeTool } from "../../stores/ToolStore.js";
import { fabric } from "fabric";

const Canvas = forwardRef((props, ref) => {
  const canvas = useRef(null);
  const board = useRef(null);
  const dispatch = useDispatch();
  const ToolStore = useSelector((state) => state.ToolStore);
  const CanvasStore = useSelector((state) => state.CanvasStore);
  useEffect(() => {
    const initFabric = () => {
      if (board.current === null) {
        var rect1 = new fabric.Rect({
          left: 50,
          top: 100,
          fill: "red",
          width: 100,
          height: 100,
        });
        var rect2 = new fabric.Rect({
          left: 300,
          top: 200,
          fill: "red",
          width: 100,
          height: 100,
        });
        var rect3 = new fabric.Rect({
          left: 100,
          top: 200,
          fill: "red",
          width: 100,
          height: 100,
        });
        board.current = new fabric.Canvas(canvas.current.id);
        // board.current.add(rect1);
        // board.current.add(rect2);
        // board.current.add(rect3);
        var poly = new fabric.Polyline(
          [
            { x: 10, y: 10 },
            { x: 50, y: 30 },
            { x: 40, y: 70 },
            { x: 60, y: 50 },
            { x: 100, y: 150 },
            { x: 40, y: 100 },
          ],
          {
            stroke: "red",
            left: 100,
            top: 100,
          }
        );
        // board.current.add(poly);
      }
    };

    const disposeFabric = () => {
      console.log("save state dispose");
      dispatch(saveState(board.current.toObject()));
      board.current.dispose();
    };

    initFabric();
    setSize();
    board.current.off("mouse:down");
    board.current.off("mouse:move");
    board.current.off("mouse:up");
    board.current.on("mouse:down", (options) => {
      document.removeEventListener("keyup", deleteKeyElemRem);
      document.addEventListener("keyup", deleteKeyElemRem);

      if (
        options.target !== null &&
        ToolStore.tool !== "eraser" &&
        ToolStore.properties.mode !== "remover" &&
        ToolStore.tool !== "pencil"
      ) {
        dispatch(changeTool({ tool: "selection" }));
      }
    });

    if (ToolStore.tool === "selection") Selection();
    else if (ToolStore.tool === "pencil") Pencil();
    else if (ToolStore.tool === "eraser") Eraser();
    else if (ToolStore.tool === "text") Text();
    else if (ToolStore.tool === "image") Image();
    else if (ToolStore.tool === "stickynote") stickynote();
    else if (ToolStore.tool === "shape") Shape();

    // if (ToolStore.tool !== "selection") {
    // document.removeEventListener("keyup", deleteKeyElemRem);
    // }
    return () => {};
  }, [dispatch, ToolStore]);

  const mouseMoveShape = (shape) => {
    // if(shape)
  };
  const addShape = (options) => {
    // console.log("Add Shape", ToolStore.properties.shape);
    board.current.selection = false;
    board.current.discardActiveObject();
    const pointer = board.current.getPointer(options.e);
    board.current.isDrawingMode = false;
    console.log("Add Shape", "rectangle");
    if (ToolStore.properties.shape === "rectangle") {
      const rect = new fabric.Rect({
        left: pointer.x,
        top: pointer.y,
        width: 10,
        height: 10,
        fill: ToolStore.color,
      });
      board.current.add(rect);
      if (rect) {
        board.current.setActiveObject(rect);
      }
      board.current.on("mouse:move", drawShape);
    } else if (ToolStore.properties.shape === "circle") {
      console.log("Add Shape", "circle");
      const circle = new fabric.Circle({
        left: pointer.x,
        top: pointer.y,
        radius: 5,
        fill: ToolStore.color,
      });
      board.current.add(circle);
      if (circle) {
        board.current.setActiveObject(circle);
      }
      board.current.on("mouse:move", drawShape);
    } else if (ToolStore.properties.shape === "triangle") {
      console.log("Add Shape", "triangle");
      const triangle = new fabric.Triangle({
        left: pointer.x,
        top: pointer.y,
        width: 10,
        height: 10,
        fill: ToolStore.color,
      });
      board.current.add(triangle);
      if (triangle) {
        board.current.setActiveObject(triangle);
      }
      board.current.on("mouse:move", drawShape);
    } else if (ToolStore.properties.shape === "ellipse") {
      console.log("Add Shape", "ellipse");
      const ellipse = new fabric.Ellipse({
        left: pointer.x,
        top: pointer.y,
        rx: 5, // horizontal radius
        ry: 5, // vertical radius
        radius: 5,
        fill: ToolStore.color,
      });
      board.current.add(ellipse);
      if (ellipse) {
        board.current.setActiveObject(ellipse);
      }
      board.current.on("mouse:move", drawShape);
    }
  };

  const drawShape = (options) => {
    // console.log(options);
    const shape = board.current.getActiveObject();
    const pointer = board.current.getPointer(options.e);
    // Update the width and height of the rectangle while dragging
    if (
      ToolStore.properties.shape === "rectangle" ||
      ToolStore.properties.shape === "triangle"
    ) {
      shape.width = pointer.x - shape.left;
      shape.height = pointer.y - shape.top;
    } else if (ToolStore.properties.shape === "circle") {
      shape.radius = (pointer.x - shape.left) / 2;
    } else if (ToolStore.properties.shape === "ellipse") {
      shape.rx = pointer.x - shape.left;
      shape.ry = pointer.x - shape.left;
    }

    board.current.renderAll();
  };

  const doneShape = () => {
    board.current.isDrawingMode = false;
    board.current.off("mouse:move");
    dispatch(
      changeTool({
        tool: "selection",
        properties: { ...ToolStore.properties },
      })
    );
    board.current.selection = true;
    board.current.renderAll();
    const shape = board.current.getActiveObject();
    if (shape !== null) {
      if (shape.width < 0 || shape.height < 0) {
        shape.height = Math.abs(shape.height);
        shape.width = Math.abs(shape.width);
        shape.left = shape.left - shape.width;
        shape.top = shape.top - shape.height;
      }

      if (shape.radius < 0) {
        shape.radius = Math.abs(shape.radius);
        shape.left = shape.left - shape.radius;
        shape.top = shape.top - shape.radius;
      }

      if (shape.rx < 0 || shape.ry < 0) {
        shape.height = Math.abs(shape.ry);
        shape.width = Math.abs(shape.rx);
        shape.left = shape.left - shape.rx;
        shape.top = shape.top - shape.ry;
      }
    }
    board.current.renderAll();
  };

  const Shape = () => {
    board.current.off("mouse:down");
    board.current.off("mouse:move");
    board.current.off("mouse:up ");
    board.current.on("mouse:down", addShape);
    board.current.on("mouse:up", doneShape);
  };

  const setSize = () => {
    if (board.current !== null) {
      var heightInVH = 50;
      var widthInVW = 80;
      var windowHeight = window.innerHeight * (heightInVH / 100);
      var windowWidth = window.innerWidth * (widthInVW / 100);
      board.current.setDimensions({ width: windowWidth, height: windowHeight });
    }
  };

  const Pencil = () => {
    board.current.isDrawingMode = true;
    board.current.freeDrawingBrush = new fabric.PencilBrush(board.current);
    board.current.freeDrawingBrush.color = ToolStore["color"] || "blue";
    if (!("size" in ToolStore.properties)) {
      dispatch(changeTool({ tool: "pencil", properties: { size: 3 } }));
    }
    board.current.freeDrawingBrush.width = ToolStore.properties.size;
  };

  const deleteKeyElemRem = (e) => {
    if (e.key === "Delete") {
      board.current.getActiveObjects().forEach((element) => {
        board.current.remove(element);
      });
      board.current.discardActiveObject();
      board.current.renderAll();
    }
  };

  const Selection = () => {
    board.current.isDrawingMode = false;
    board.current.selection = true;
  };

  const mouseClickRemover = (options) => {
    if ("mode" in ToolStore.properties) {
      console.log(ToolStore.properties);
      board.current.remove(options.target);
    }
  };

  const Eraser = () => {
    // console.log("eraser");
    if (ToolStore.properties.mode !== "remover") {
      board.current.isDrawingMode = true;
      board.current.freeDrawingBrush = new fabric.EraserBrush(board.current);
      board.current.freeDrawingBrush.color = "rgba(255,255,255)"; // Set eraser color to transparent
      if (!("size" in ToolStore.properties)) {
        dispatch(changeTool({ tool: "eraser", properties: { size: 15 } }));
      }
      board.current.freeDrawingBrush.width = ToolStore.properties.size;
    } else {
      board.current.isDrawingMode = false;
      board.current.selection = false;
      board.current.on("mouse:down", mouseClickRemover);
    }
  };

  const Text = () => {
    board.current.isDrawingMode = false;
    if (ToolStore.properties.size && ToolStore.properties.size !== "") {
      const text = new fabric.Textbox("Add Text", {
        fontSize: ToolStore.properties.size,
        left: board.current.getCenter().left - ToolStore.properties.size,
        top: board.current.getCenter().top - ToolStore.properties.size,
        fill: ToolStore.color || "black",
        fontFamily: ToolStore.properties.font || "",
        fontStyle: ToolStore.properties.style || "normal",
        fontWeight: ToolStore.properties.fontWeight || "normal",
        underline: ToolStore.properties.underline || false,
        textAlign: ToolStore.properties.align || "left",
      });
      console.log(ToolStore.properties);
      board.current.add(text);
    }
  };

  const Image = () => {
    if ("src" in ToolStore.properties) {
      fabric.Image.fromURL(ToolStore.properties.src, (img) => {
        img.scaleToHeight(ToolStore.properties.height);
        img.scaleToWidth(ToolStore.properties.width);
        board.current.add(img);
      });
    }
  };

  const stickynote = () => {
    const canvas = board.current;

    // Create a sticky note
    const stickyNote = new fabric.Rect({
      left: 50,
      top: 50,
      width: 150,
      height: 100,
      fill: "yellow",
      borderColor: "black",
      cornerColor: "black",
      cornerSize: 10,
      hasControls: true,
    });

    const text = new fabric.Textbox("Type your note here", {
      fontSize: 14,
      width: stickyNote.width - 10,
      height: stickyNote.height - 10,
      left: stickyNote.left + 5,
      top: stickyNote.top + 5,
      editable: true,
    });

    const group = new fabric.Group([stickyNote, text], {
      selectable: true,
    });

    canvas.add(group);
    // group.onSelect = () => {
    //   const items = group._objects.slice();
    //   canvas.remove(group);
    //   canvas.add(...items);
    //   canvas.renderAll();
    // };
  };

  return (
    <div className="w-full h-[90vh] bg-gray-100 mr-2 flex items-center justify-center">
      <canvas
        ref={canvas}
        id="board"
        className="border-2 border-black"
      ></canvas>
    </div>
  );
});

export default Canvas;
