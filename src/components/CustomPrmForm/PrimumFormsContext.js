import { createContext, useContext, useState } from "react";

export const PrimumFormsContext = createContext();
PrimumFormsContext.displayName = "PrimumFormsContext";

export const PrimumFormsProvider = ({ children }) => {
  const [formController, setFormController] = useState({});

  return (
    <PrimumFormsContext.Provider value={(formController, setFormController)}>
      {children}
    </PrimumFormsContext.Provider>
  );
};

export const usePrmFormContext = () => {
  const { formController, setFormController } = useContext(PrimumFormsContext);

  return { formController, setFormController };
};
