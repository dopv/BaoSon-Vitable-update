import { useState } from "react";
import { combineReducers } from 'un-redux';

interface StateAuth {
  isLogout: false,
  dataAuth: null,
  token: null
}
export const rootReducer = combineReducers({

  reducerAuth: (state: StateAuth, action: any) => {
   
    if (action.type === 'TOKEN') {
      return {
        ...state,
        token: action.token,
      };
    } 
    if (action.type === 'LOGIN') {
      return {
        ...state, 
        dataAuth: action.dataAuth,
        isLogout: false,
        token: action.dataAuth && action.dataAuth.access_token 
      };
    } 
   
    if (action.type === 'LOGOUT') {
      return {
        ...state,
        dataAuth: null,
        isLogout: true,
        token: null
      };
    }
  }
});

interface StateMapProps {
  reducerAuth: {}
}
export const mapStateToProps = (state: StateMapProps) => {
  return {
    stateAuth: state.reducerAuth
  }
}

export const mapDispatchToProps = (dispatch: any) => {
  return {
    actionLogin: (dataAuth: null) => {
      dispatch({ type: 'LOGIN', dataAuth: dataAuth})
    },
    setToken: (token: null) => {
      dispatch({ type: 'TOKEN', token: token })
    },
    actionLogout: () => dispatch({ type:'LOGOUT' }),
  };
}