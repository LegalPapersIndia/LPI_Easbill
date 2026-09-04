import { createContext, useContext, useState } from "react";
import { invoicePrintSettings as defaultSettings } from "../data/dummyData";

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [printSettings, setPrintSettings] = useState(defaultSettings);

  const updateTemplate = (template) => {
    setPrintSettings((prev) => ({ ...prev, invoiceTemplate: template }));
  };

  return (
    <SettingsContext.Provider value={{ printSettings, updateTemplate }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
