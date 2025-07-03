import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const sunMercyrTrackerLoadUser = async () => {
      try {
        const storedSunMercyrTrackerLoadUser = await AsyncStorage.getItem('currentUser');
        if (storedSunMercyrTrackerLoadUser) {
          setUser(JSON.parse(storedSunMercyrTrackerLoadUser));
        }
      } catch (error) {
        console.error('Error loading sun mercyr tracker user:', error);
      }
    };
    sunMercyrTrackerLoadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
