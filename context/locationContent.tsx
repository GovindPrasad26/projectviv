import React, { createContext, useState, useEffect, ReactNode, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "./Auth";

interface LocationData {
  address: string;
  lat: number | null;
  lng: number | null;
}

interface LocationContextType {
  location: LocationData | null;
  setLocation: (loc: LocationData) => void;
  recentLocations: LocationData[];
  addLocation: (loc: LocationData) => void;
  clearRecentLocations: () => void;
}

export const LocationContext = createContext<LocationContextType>({
  location: null,
  setLocation: () => {},
  recentLocations: [],
  addLocation: () => {},
  clearRecentLocations: () => {},
});

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [recentLocations, setRecentLocations] = useState<LocationData[]>([]);
  const { user } = useContext(AuthContext);

  // Load recent locations on app start
  useEffect(() => {
    const loadRecentLocations = async () => {
      try {
        const stored = await AsyncStorage.getItem("recentLocations");
        if (stored) {
          setRecentLocations(JSON.parse(stored));
        }
      } catch (error) {
        console.error("Error loading recent locations:", error);
      }
    };
    loadRecentLocations();
  }, []);

  // Clear recent locations automatically on logout
  useEffect(() => {
    const handleLogout = async () => {
      if (!user) {
        await clearRecentLocations();
        setLocation(null);
        console.log("User logged out, recent locations cleared");
      }
    };
    handleLogout();
  }, [user]);

  const addLocation = async (loc: LocationData) => {
    try {
      const updated = [loc, ...recentLocations.filter(r => r.address !== loc.address)];
      setRecentLocations(updated);
      await AsyncStorage.setItem("recentLocations", JSON.stringify(updated));
      setLocation(loc);
      console.log("Location added:", updated);
    } catch (error) {
      console.error("Error saving recent location:", error);
    }
  };

  const clearRecentLocations = async () => {
    try {
      setRecentLocations([]);
      await AsyncStorage.removeItem("recentLocations");
      console.log("Recent locations cleared");
    } catch (error) {
      console.error("Error clearing recent locations:", error);
    }
  };

  return (
    <LocationContext.Provider
      value={{
        location,
        setLocation,
        recentLocations,
        addLocation,
        clearRecentLocations,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
