import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tool: "text",
  editable: "",
  properties: { shape: "circle" },
  color: "black",
  toolChanging: false,
  options: true,
};

export const ToolStore = createSlice({
  name: "ToolStore",
  initialState,
  reducers: {
    changeTool: (state, action) => {
      state.tool = action.payload.tool || state.tool;
      state.editable = action.payload.editable || state.editable;
      state.properties = action.payload.properties || {};
      state.toolChanging = true;
    },
    changeColor: (state, action) => {
      state.color = action.payload;
      if (state.tool === "text") state.properties.size = "";
      state.toolChanging = true;
    },
    changedDone: (state) => {
      state.toolChanging = false;
    },
    setOptions: (state, action) => {
      if (action.payload !== undefined) {
        state.options = action.payload;
      } else if (state.options === true) {
        state.options = false;
      } else {
        state.options = true;
      }
    },
  },
});

export const { changeTool, changeColor, changedDone, setOptions } =
  ToolStore.actions;

export default ToolStore.reducer;
