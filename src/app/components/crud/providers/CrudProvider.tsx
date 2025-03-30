import { ReactNode, useContext } from "react";
import CrudContext, { CrudContextType } from "../contexts/CrudContext";

interface CrudProviderProps extends CrudContextType {
  children: ReactNode;
}

export default function CrudProvider({
  children,
  fields,
  validationSchema,
}: CrudProviderProps) {
  return (
    <CrudContext.Provider value={{ fields, validationSchema }}>
      {children}
    </CrudContext.Provider>
  );
}

export const useCrud = () => {
  const context = useContext(CrudContext);
  if (context === undefined) {
    throw new Error("useCrud must be used within a CrudProvider");
  }
  return context;
};
