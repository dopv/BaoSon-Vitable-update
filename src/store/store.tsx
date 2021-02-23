import { useCallback, useState } from 'react';
import unreduxed from "unreduxed";

const useUnredux = () => {
  const [dataAuth, setDataAuth] = useState<any>();
  const [isLogout, setLogout] = useState<any>();
  const [token, setToken] = useState<any>();
  const [userInfo, setInfo] = useState<any>();
  const [dataTrans, setDataTrans] = useState<any>();
  const [dataNextPack, setDataNextPack] = useState<any>();

  const loginFunc = (dataAuth: any) => {
    setLogout(false);
    setDataAuth(dataAuth);
  }

  const setTokenFunc = (token: any) => {
    setToken(token)
  }

  const logoutFunc = () => {
    setLogout(true);
    setToken(null);
    setInfo(null);
    setDataAuth(null);
  }

  const getUserFunc = (info: any, token: string) => {
    setInfo(info);
    setToken(token);
    setLogout(false);
  }

  const setDataTransFunc = (data: any) => {
    setDataTrans(data);
  }

  const setDataNextPackFunc = (data: any) => {
    setDataNextPack(data)
  }

  const loginAction = useCallback((dataAuth: any) => loginFunc(dataAuth), []);
  const setTokenAction = useCallback((token: any) => setTokenFunc(token), []);
  const logoutAction = useCallback(() => logoutFunc(), []);
  const getUserInfoAction = useCallback((info: any, token: string) => getUserFunc(info, token), []);
  const setDataTransAction = useCallback((data: any) => setDataTransFunc(data), []);
  const setDataNextPackAction = useCallback((data: any) => setDataNextPackFunc(data), []);

  return {
    dataAuth, isLogout, token, userInfo, dataTrans, dataNextPack,
    loginAction, setTokenAction, logoutAction, getUserInfoAction, setDataTransAction, setDataNextPackAction
  };
};

export const [ContainerProvider, useContainer] = unreduxed(useUnredux);