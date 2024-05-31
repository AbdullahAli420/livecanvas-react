import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../socket";
import { addUser } from "../../stores/CanvasStore";

const UserManage = () => {
  const manage = useSelector((state) => state.ToolStore.manage);
  const users = useSelector((state) => state.CanvasStore.users);
  const room = useSelector((state) => state.CanvasStore.room);
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.CanvasStore.admin);
  console.log(`admin: `, admin);
  Object.keys(users).forEach((user) => console.log(users[user]));
  useEffect(() => {
    socket.on("users", (joined) => {
      dispatch(addUser(joined.users));
      console.log(joined);
    });
    return () => {
      socket.off("room_joined");
    };
  }, ["room_joined"]);
  const Block = (user) => {
    socket.emit("remove_user", { user: user, room: room });
  };
  return (
    <>
      {manage && (
        <div className="items-center md:p-0 md:px-3 block absolute bg-white right-12 text-black rounded-lg p-4 border-2 border-gray-500 z-30">
          <div className="text-2xl">Connections:</div>
          <div className="flex justify-between w-full">
            <span>Board: {room}</span>
            <span>Connected: {Object.keys(users).length}</span>
          </div>
          <div>
            {Object.keys(users).map((user) => (
              <div
                key={user}
                className="flex justify-between hover:bg-gray-200 p-2 cursor-pointer w-64"
              >
                <div className="text-xl text-wrap">{users[user]}</div>
                <div className="flex">
                  {admin !== users[user] && (
                    <button
                      className={`flex justify-center items-center p-1 border-2 border-transparent`}
                    >
                      <span
                        className="material-symbols-outlined"
                        onClick={() => Block(user)}
                      >
                        block
                      </span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default UserManage;
