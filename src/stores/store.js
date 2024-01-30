import { configureStore } from "@reduxjs/toolkit";
import ToolStore from "./ToolStore";
import CanvasStore from "./CanvasStore";

export const store = configureStore({
  reducer: {
    ToolStore: ToolStore,
    CanvasStore: CanvasStore,
  },
});
