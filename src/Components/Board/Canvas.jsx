import React, { forwardRef, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveState, undo, redo, setOperation } from "../../stores/CanvasStore";
import { changeTool } from "../../stores/ToolStore.js";
import { fabric } from "fabric";
import { socket } from "../../socket.js";

const Canvas = forwardRef((props, ref) => {
  const canvas = useRef(null);
  const board = useRef(null);
  const dispatch = useDispatch();
  const ToolStore = useSelector((state) => state.ToolStore);
  const CanvasStore = useSelector((state) => state.CanvasStore);
  const room = useSelector((state) => state.CanvasStore.room);
  const change = (options) => {
    if (CanvasStore.operation === 0) {
      dispatch(saveState(board.current.toObject()));
      socket.emit("Board", {
        room: room,
        board: board.current.toDataURL("png"),
      });
    }
  };
  const Undo = () => {
    // board.current
    // .loadFromJSON
    board.current.loadFromJSON(
      JSON.stringify(CanvasStore.states[CanvasStore.currentState - 1])
    );
    dispatch(undo());
  };
  const Redo = () => {
    board.current.loadFromJSON(
      JSON.stringify(CanvasStore.states[CanvasStore.currentState + 1])
    );
    dispatch(redo());
  };
  const UndoRedoHandlerKey = (e) => {
    let Zkey = e.code === "KeyZ" && e.ctrlKey;
    let Ykey = e.code === "KeyY" && e.ctrlKey;
    if (Zkey) dispatch(setOperation(1));
    else if (Ykey) dispatch(setOperation(2));
  };
  useEffect(() => {
    if (board.current !== null) {
      socket.on("joined", () => {
        console.log("joined");
        socket.emit("Board", {
          room: room,
          board: board.current.toDataURL("png"),
        });
      });
    }

    return () => {
      socket.off("joined");
    };
  }, ["joined"]);

  useEffect(() => {
    if (board.current !== null) {
      if (CanvasStore.operation === 0) {
        board.current.on("object:added", change);
        board.current.on("object:modified", change);
        board.current.on("object:removed", change);
      }
      if (CanvasStore.operation === 1) Undo();
      else if (CanvasStore.operation === 2) Redo();
    }
    return () => {
      board.current.off("object:added", change);
      board.current.off("object:modified", change);
      board.current.off("object:removed", change);
    };
  }, [board.current, CanvasStore.operation]);

  useEffect(() => {
    const initFabric = () => {
      if (board.current === null) {
        board.current = new fabric.Canvas(canvas.current.id);
        dispatch(saveState(board.current.toObject()));
      } else {
        board.current.loadFromJSON(
          JSON.stringify(CanvasStore.states[CanvasStore.currentState])
        );
      }
    };

    initFabric();
    setSize();
    document.addEventListener("keyup", UndoRedoHandlerKey);
    board.current.on("mouse:down", (options) => {
      dispatch(setOperation(0));
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
    board.current.isDrawingMode = false;
    if (CanvasStore.operation !== 0) dispatch(setOperation(0));
    if (ToolStore.tool === "selection") Selection();
    else if (ToolStore.tool === "pencil") Pencil();
    else if (ToolStore.tool === "eraser") Eraser();
    else if (ToolStore.tool === "text") Text();
    else if (ToolStore.tool === "image") Image();
    else if (ToolStore.tool === "stickynote") stickynote();
    else if (ToolStore.tool === "shape") Shape();
    return () => {
      board.current.off("mouse:down");
      board.current.off("mouse:move");
      board.current.off("mouse:up");
      document.removeEventListener("keyup", UndoRedoHandlerKey);
    };
  }, [dispatch, ToolStore, Canvas.currentState]);

  useEffect(() => {
    if (board.current !== null) {
    }
  }, [board.current]);

  const addShape = (options) => {
    if (!"shape" in ToolStore.properties) board.current.selection = true;
    else board.current.selection = false;
    board.current.discardActiveObject();
    board.current.getObjects().forEach((e) => {
      e.set("evented", false);
      e.set("selectable", false);
    });
    // board.current.renderAll();
    // console.log(board.current.getActiveObjects());
    const pointer = board.current.getPointer(options.e);
    board.current.isDrawingMode = false;
    if (ToolStore.properties.shape === "rect") {
      // console.log("Add Shape", "rectangle");
      const rect = new fabric.Rect({
        left: pointer.x,
        top: pointer.y,
        width: 0,
        height: 0,
        rx: null,
        ry: null,
        fill: ToolStore.color,
      });
      board.current.add(rect);
      if (rect) {
        board.current.setActiveObject(rect);
      }
    } else if (ToolStore.properties.shape === "circle") {
      // console.log("Add Shape", "circle");
      const circle = new fabric.Circle({
        left: pointer.x,
        top: pointer.y,
        radius: 0,
        fill: ToolStore.color,
      });
      board.current.add(circle);
      if (circle) {
        board.current.setActiveObject(circle);
      }
    } else if (ToolStore.properties.shape === "triangle") {
      // console.log("Add Shape", "triangle");
      const triangle = new fabric.Triangle({
        left: pointer.x,
        top: pointer.y,
        width: 0,
        height: 0,
        fill: ToolStore.color,
      });
      board.current.add(triangle);
      if (triangle) {
        board.current.setActiveObject(triangle);
      }
    } else if (ToolStore.properties.shape === "ellipse") {
      // console.log("Add Shape", "ellipse");
      const ellipse = new fabric.Ellipse({
        left: pointer.x,
        top: pointer.y,
        rx: 0, // horizontal radius
        ry: 0, // vertical radius
        fill: ToolStore.color,
      });
      board.current.add(ellipse);
      if (ellipse) {
        board.current.setActiveObject(ellipse);
      }
    } else if (ToolStore.properties.shape === "line") {
      // console.log("Add Shape", "line");
      const line = new fabric.Line(
        [pointer.x, pointer.y, pointer.x, pointer.y],
        {
          stroke: ToolStore.color || "black",
          strokeWidth: ToolStore.properties.size || 2,
          strokeLineCap: "round",
        }
      );
      board.current.add(line);
      if (line) {
        board.current.setActiveObject(line);
      }
    } else {
      const rect = new fabric.Rect({
        left: pointer.x,
        top: pointer.y,
        width: 0,
        height: 0,
        rx: null,
        ry: null,
        fill: ToolStore.color,
      });
      board.current.add(rect);
      if (rect) {
        board.current.setActiveObject(rect);
      }
    }
    board.current.on("mouse:move", drawShape);
  };

  const drawShape = (options) => {
    // console.log(options);
    const shape = board.current.getActiveObject();
    const pointer = board.current.getPointer(options.e);
    // Update the width and height of the rectangle while dragging
    if (shape !== null) {
      if (
        ToolStore.properties.shape === "rect" ||
        ToolStore.properties.shape === "triangle"
      ) {
        shape.set({
          width: Math.abs(pointer.x - shape.left),
          height: Math.abs(pointer.y - shape.top),
        });
      } else if (ToolStore.properties.shape === "circle") {
        shape.set({ radius: Math.abs((pointer.x - shape.left) / 2) });
      } else if (ToolStore.properties.shape === "ellipse") {
        shape.set({
          rx: Math.abs(pointer.x - shape.left),
          ry: Math.abs(pointer.y - shape.top),
        });
      } else if (ToolStore.properties.shape === "line") {
        shape.set({ x2: pointer.x, y2: pointer.y });
      } else {
        shape.set({
          width: Math.abs(pointer.x - shape.left),
          height: Math.abs(pointer.y - shape.top),
        });
      }
    }
    board.current.renderAll();
  };

  const doneShape = () => {
    board.current.isDrawingMode = false;
    board.current.off("mouse:move");
    // console.log(ToolStore.properties.shape);
    if (
      "shape" in ToolStore.properties &&
      ToolStore.properties.shape !== "line"
    ) {
    }
    board.current.selection = true;
    board.current.renderAll();
    const shape = board.current.getActiveObject();
    console.log(shape);
    if (shape !== null) {
      if (
        shape.width === 0 ||
        shape.height === 0 ||
        shape.rx === 0 ||
        shape.ry === 0 ||
        shape.radius === 0
      ) {
        dispatch(
          changeTool({
            tool: "selection",
            properties: { ...ToolStore.properties },
          })
        );
        board.current.remove(shape);
      }
      shape.set("evented", false);
    }
    board.current.discardActiveObject();
    board.current.renderAll();
  };

  const Shape = () => {
    board.current.selection = true;
    // dispatch(setOperation(0));
    board.current.off("mouse:down");
    board.current.off("mouse:move");
    board.current.off("mouse:up ");
    board.current.on("mouse:down", addShape);
    board.current.on("mouse:up", doneShape);
  };

  const setSize = () => {
    if (board.current !== null) {
      const { board_width, board_height } = CanvasStore.dimensions;
      // var heightInVH = 50;
      // var widthInVW = 80;
      // var windowHeight = window.innerHeight * (board_height / 100);
      // var windowWidth = window.innerWidth * (board_width / 100);
      board.current.setDimensions({ width: board_width, height: board_height });
      // board.current.setBackground(CanvasStore.background);
      board.current.backgroundColor = CanvasStore.background;
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
    board.current.freeDrawingBrush.opacity = 0.5;
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
    board.current.forEachObject((obj) => {
      obj.set({ selectable: true });
      obj.set("evented", true);
    });
    board.current.on("mouse:down", (options) => {
      if (options.target !== null) {
        const obj = options.target;
        const objType = obj.type;

        if (
          objType === "rect" ||
          objType === "circle" ||
          objType === "ellipse" ||
          objType === "triangle" ||
          objType === "line"
        ) {
          const color = () => {
            if (objType === "line") {
              return obj.stroke;
            } else {
              return obj.fill;
            }
          };
          dispatch(
            changeTool({ editable: "shape", color: color(), properties: {} })
          );
        }
      }
    });
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
    console.log(ToolStore);
    board.current.renderAll();
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
    board.current.on("mouse:down", (options) => {
      // console.log(options.target.type);
      if (options.target !== null && options.target.type === "textbox") {
        console.log(options.target);
        const text = options.target;
        dispatch(
          changeTool({
            tool: "text",
            editable: "true",
            color: text.fill,
            properties: {
              size: text.fontSize,
              font: text.fontFamily || "",
              style: text.fontStyle || "normal",
              fontWeight: text.fontWeight || "normal",
              underline: text.underline || false,
              align: text.textAlign || "left",
            },
          })
        );
      } else {
        const pointer = board.current.getPointer(options.e);
        console.log(board.current.getObjects());
        const size =
          "size" in ToolStore.properties && ToolStore.properties.size > 9
            ? ToolStore.properties.size
            : 35;
        const text = new fabric.Textbox("Add Text", {
          fontSize: size,
          left: pointer.x - size,
          top: pointer.y - size,
          fill: ToolStore.color || "black",
          fontFamily: ToolStore.properties.font || "",
          fontStyle: ToolStore.properties.style || "normal",
          fontWeight: ToolStore.properties.fontWeight || "normal",
          underline: ToolStore.properties.underline || false,
          textAlign: ToolStore.properties.align || "left",
        });
        console.log(text);
        board.current.add(text);
      }
    });
  };

  const Image = () => {
    if ("src" in ToolStore.properties) {
      fabric.Image.fromURL(ToolStore.properties.src, (img) => {
        if (
          ToolStore.properties.height >= 30 &&
          ToolStore.properties.width >= 30
        ) {
          img.scaleToHeight(ToolStore.properties.height);
          img.scaleToWidth(ToolStore.properties.width);
        }
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
  };

  return (
    <div className="w-full h-[90vh] mr-2 flex items-center justify-center overflow-scroll flex-wrap">
      <canvas
        ref={canvas}
        id="board"
        className="border-2 border-black top-0 m-3"
      ></canvas>
    </div>
  );
});

export default Canvas;
