import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentState: -1,
  states: [],
  operation: -1,
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
  },
});

export const { saveState, undo, redo, setOperation } = CanvasStore.actions;

export default CanvasStore.reducer;
