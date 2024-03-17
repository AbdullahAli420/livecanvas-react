import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tool: "text",
  editable: "",
  properties: { shape: "circle" },
  color: "black",
  toolChanging: false,
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
  },
});

export const { changeTool, changeColor, changedDone } = ToolStore.actions;

export default ToolStore.reducer;
