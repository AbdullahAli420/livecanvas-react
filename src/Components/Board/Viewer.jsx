import React, { useEffect, useRef, useState } from "react";
import { socket } from "../../socket";
import { useSelector } from "react-redux";

const Viewer = () => {
  const Img = useRef(null);
  const [room, setRoom] = useState("");

  useEffect(() => {
    socket.on("removed", (data) => {
      alert(`Your are removed from board ${data}!`);
    });
    socket.on("Board-data", (board) => {
      setRoom(board.room);
      Img.current.src = board.board;
      console.log(board.user);
    });
    return () => {
      socket.off("removed");
    };
  }, ["removed"]);
  const exit = () => {
    alert("You have left board successfully!");
    socket.emit("exit", room);
  };
  return (
    <div className="">
      <div className=" flex justify-between p-2">
        <span className="p-3">
          <span className="font-bold">Room: </span> {room}
        </span>
        <div>
          <button
            className="bg-green-700 hover:bg-green-900 text-white w-full px-6 py-1 rounded"
            onClick={exit}
          >
            Exit
          </button>
        </div>
      </div>
      <div className="w-full h-full flex items-center justify-center p-2">
        <img
          ref={Img}
          src=""
          alt=""
          className="h-auto w-auto border-2 border-black"
        />
      </div>
    </div>
  );
};

export default Viewer;
