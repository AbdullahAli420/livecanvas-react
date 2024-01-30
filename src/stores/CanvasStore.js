import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentState: -1,
  states: [],
};

export const CanvasStore = createSlice({
  name: "CanvasStore",
  initialState,
  reducers: {
    saveState: (state, action) => {
      state.states.push(action.payload);
      state.currentState = state.states.length - 1;
      // console.log(state.currentState, state.states, action.payload);
    },
  },
});

export const { saveState } = CanvasStore.actions;

export default CanvasStore.reducer;
