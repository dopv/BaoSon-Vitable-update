import { useState } from "react";
import { createContainer } from 'unstated-next'
export const useStore = () => {
  const initAuthState: any = undefined;
  const [isAuth, setAuth] = useState(initAuthState);

  const login = () => {
    setAuth(true);
  };

  const logout = () => {
    setAuth(false);
  };

  return {
    login,
    logout,
    isAuth
  };
}
export const StoreContainer = createContainer(useStore);