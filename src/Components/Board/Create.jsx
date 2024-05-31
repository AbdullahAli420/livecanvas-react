import React, { useEffect, useState } from "react";
import { socket } from "../../socket";
import { useDispatch, useSelector } from "react-redux";
import { setCreate } from "../../stores/ToolStore";
import { SetupBoard, addUser } from "../../stores/CanvasStore";

const Create = ({ setLoading, setViewer }) => {
  // const socket = io("http://localhost:8000");
  const [form, setForm] = useState("join");
  const [url, setURL] = useState("");
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");
  const create = useSelector((state) => state.ToolStore.create);
  const dispatch = useDispatch();
  useEffect(() => {
    socket.on("room_created", (created) => {
      setLoading(false);
      if (created.res) {
        dispatch(setCreate(false));
      } else {
        alert(`Room: ${room} already exist!`);
      }
      // dispatch(SetupBoard({ room: msg.room, name: msg.name, permissions: 0 }));
    });
    socket.on("room_joined", (joined) => {
      console.log("room_joined");
      setLoading(false);
      if (joined.res) {
        dispatch(setCreate(false));
        setViewer(true);
      } else {
        alert(`Room doesn't exit`);
      }
      // dispatch(SetupBoard({ room: msg.room, name: msg.name, permissions: 0 }));
    });
    return () => {
      socket.off("room_created");
      socket.off("room_joined");
    };
  }, ["room_created", "room_joined"]);

  const createRoom = () => {
    if (room !== "" || name !== "") {
      setLoading(true);
      socket.timeout(5000).emit("create_room", { room, name });
      dispatch(SetupBoard({ room: room, name: name, permissions: 1 }));
    } else {
      alert("Please enter room name and name!");
    }
  };
  const JoinRoom = () => {
    if (url !== "" || name !== "") {
      setLoading(true);
      socket.timeout(5000).emit("join_room", { url, name });
      // dispatch(SetupBoard({ room: room, name: name, permissions: 1 }));
    } else {
      alert("Please enter room name and your name!");
    }
  };
  return (
    <>
      {create && (
        <>
          <div className="flex w-full absolute justify-center top-0 h-screen bg-gray-400 bg-opacity-20 z-20"></div>
          <div className="flex w-full absolute justify-center top-0 z-30">
            <div className="md:p-0 mt-2 md:px-3 block h-min top-3 bg-white text-black rounded- p-4 opacity border-solid border-[1px] border-black">
              <div className="flex">
                <button
                  className={`text-2xl m-2 hover:border-gray-400 border-b-2 ${
                    form === "join" ? " border-black" : ""
                  }`}
                  onClick={() => setForm("join")}
                >
                  Join
                </button>
                <button
                  className={`text-2xl m-2 hover:border-gray-400 border-b-2 ${
                    form === "create" ? " border-black" : ""
                  }`}
                  onClick={() => setForm("create")}
                >
                  Create
                </button>
              </div>
              {form === "join" && (
                <>
                  <div className="flex m-2">
                    <div className=" bg-gray-400 p-2 bg-opacity-60 flex">
                      <span className="material-symbols-outlined">person</span>
                    </div>
                    <input
                      type="url"
                      className="text-center border-2 border-solid"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                    />
                  </div>
                  <div className="flex m-2">
                    <div className=" bg-gray-400 p-2 bg-opacity-60 flex">
                      <span className="material-symbols-outlined">link</span>
                    </div>
                    <input
                      type="url"
                      className="text-center border-2 border-solid"
                      value={url}
                      onChange={(e) => setURL(e.target.value)}
                      placeholder="Room"
                    />
                  </div>
                  <div className="flex items-center m-2">
                    <button
                      className="bg-green-700 hover:bg-green-900 text-white w-full px-2 py-1 rounded mx-3 "
                      onClick={JoinRoom}
                    >
                      Join Now
                    </button>
                  </div>
                </>
              )}
              {form === "create" && (
                <>
                  <div className="flex m-2">
                    <div className=" bg-gray-400 p-2 bg-opacity-60 flex">
                      <span className="material-symbols-outlined">person</span>
                    </div>
                    <input
                      type="url"
                      className="text-center border-2 border-solid"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                    />
                  </div>
                  <div className="flex m-2">
                    <div className=" bg-gray-400 p-2 bg-opacity-60 flex">
                      <span className="material-symbols-outlined">Add</span>
                    </div>
                    <input
                      type="url"
                      className="text-center border-2 border-solid"
                      value={room}
                      onChange={(e) => setRoom(e.target.value)}
                      placeholder="room"
                    />
                  </div>
                  <div className="flex items-center m-2">
                    <button
                      className="bg-green-700 hover:bg-green-900 text-white w-full px-2 py-1 rounded mx-3 "
                      onClick={createRoom}
                    >
                      Create Now
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Create;
