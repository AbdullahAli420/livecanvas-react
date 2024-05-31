import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tool: "pencil",
  editable: "",
  properties: { shape: "circle" },
  color: "black",
  toolChanging: false,
  options: false,
  resize: false,
  create: true,
  manage: true,
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
    setResize: (state, action) => {
      if (action.payload !== undefined) {
        state.resize = false;
      } else if (state.resize === true) {
        state.resize = false;
      } else {
        state.resize = true;
      }
    },
    setCreate: (state, action) => {
      console.log(action.payload);
      if (action.payload !== undefined) {
        state.create = action.payload;
      } else if (state.create === true) {
        state.create = false;
      } else {
        state.create = true;
      }
    },
    setManage: (state, action) => {
      if (state.manage === true) {
        state.manage = false;
      } else {
        state.manage = true;
      }
    },
  },
});

export const {
  changeTool,
  changeColor,
  changedDone,
  setOptions,
  setResize,
  setCreate,
  setManage,
} = ToolStore.actions;

export default ToolStore.reducer;
