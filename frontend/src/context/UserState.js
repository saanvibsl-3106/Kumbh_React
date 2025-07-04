import { useState } from "react";
import UserContext from "./UserContext";

export const UserState = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Retrieve the user from localStorage and parse it once
    return JSON.parse(localStorage.getItem('user') || 'null');
  });

  // Function to update user and persist it in localStorage
  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Function to log out user and clear localStorage
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, setUser, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
