import { createContext, useContext, useState, useEffect } from "react";
import { getMyBusinessSettings } from "../api/businessSettingsApi";

const BusinessContext = createContext(null);

export function BusinessProvider({ children }) {
  const [businessSettings, setBusinessSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBusinessSettings = async () => {
    try {
      setLoading(true);
      const { data } = await getMyBusinessSettings();
      setBusinessSettings(data.businessSettings);
    } catch (err) {
      console.error("Business Settings fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) fetchBusinessSettings();
    else setLoading(false);
  }, []);

  return (
    <BusinessContext.Provider value={{ businessSettings, loading, refetchBusiness: fetchBusinessSettings }}>
      {children}
    </BusinessContext.Provider>
  );
}

export function useBusiness() {
  const ctx = useContext(BusinessContext);
  if (!ctx) throw new Error("useBusiness must be used within BusinessProvider");
  return ctx;
}