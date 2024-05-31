import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentState: -1,
  states: [],
  operation: -1,
  dimensions: {
    board_width: 500,
    board_height: 500,
  },
  background: "white",
  room: "",
  admin: "",
  permissions: 0,
  users: {},
};

export const CanvasStore = createSlice({
  name: "CanvasStore",
  initialState,
  reducers: {
    saveState: (state, action) => {
      state.currentState = state.currentState + 1;
      state.states.push(action.payload);
    },
    undo: (state, action) => {
      if (state.currentState > 0) state.currentState = state.currentState - 1;
      state.operation = -1;
    },
    redo: (state, action) => {
      if (state.currentState < state.states.length - 1)
        state.currentState = state.currentState + 1;
      state.operation = -1;
    },
    setOperation: (state, action) => {
      state.operation = action.payload;
      if (action.payload === 0) {
        state.states = state.states.slice(0, state.currentState + 1);
      }
    },
    ResizeCanvas: (state, action) => {
      const [width, height] = action.payload;
      console.log(parseInt(width), parseInt(height));
      state.dimensions.board_width = parseInt(width);
      state.dimensions.board_height = parseInt(height);
    },
    CanvasBackground: (state, action) => {
      state.background = action.payload || "white";
    },
    SetupBoard: (state, action) => {
      state.room = action.payload.room;
      state.admin = action.payload.name;
      state.permissions = action.payload.permissions || 0;
    },
    addUser: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const {
  saveState,
  undo,
  redo,
  setOperation,
  ResizeCanvas,
  CanvasBackground,
  SetupBoard,
  addUser,
} = CanvasStore.actions;

export default CanvasStore.reducer;
