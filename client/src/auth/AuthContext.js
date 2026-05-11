import { createContext, useContext, useState } from "react";
import axios from "axios";

const TOKEN_KEY = "token";
const NAME_KEY = "name";
const AuthContext = createContext(null);

// Registered once at module load (before any component mounts). Every outgoing
// axios request reads the current token from localStorage, so there is no race
// between AuthProvider's render/effect cycle and child components' mount-time
// fetches on a hard refresh.
axios.interceptors.request.use((config) => {
  const t = localStorage.getItem(TOKEN_KEY);
  if (t) config.headers.Authorization = `Bearer ${t}`;
  return config;
});

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [name, setName] = useState(() => localStorage.getItem(NAME_KEY));

  const login = ({ token: newToken, name: newName }) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    if (newName) localStorage.setItem(NAME_KEY, newName);
    else localStorage.removeItem(NAME_KEY);
    setToken(newToken);
    setName(newName || null);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(NAME_KEY);
    setToken(null);
    setName(null);
  };

  const value = {
    token,
    name,
    isLogged: Boolean(token),
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
