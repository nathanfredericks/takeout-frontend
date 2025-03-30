"use client";
import { GridColDef } from "@mui/x-data-grid";
import { createContext, ReactNode, useContext } from "react";

export interface CrudContextType {
  fields: GridColDef[];
  validationSchema?: any | (() => any);
}

export default createContext<{
  fields: GridColDef[];
  validationSchema?: any | (() => any);
}>({
  fields: [],
  validationSchema: undefined,
});
