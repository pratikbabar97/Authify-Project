import { createContext, useEffect, useState } from "react";
import { AppConstants } from "../util/constants";

import { toast } from "react-toastify";
import { getIsAuthenticated, getUserInfo } from "../api/api";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const backEndUrl = AppConstants.BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(false);

  const getUserData = async () => {
    try {
      const res = await getUserInfo();
      if (res.status === 200) {
        setUserData(res.data);
      } else {
        toast.error("Unable to retrieve profile");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const getAuthState = async () => {
    try {
      const res = await getIsAuthenticated();
      if (res.status === 200 && res.data === true) {
        setIsLoggedIn(true);
        await getUserData();
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.log(error);

    }
  };
  useEffect(() => {
    getAuthState();
  }, []);

  // const getUserData = async () => {
  //   try {
  //     const res = await axios.get(backEndUrl + "/profile");
  //     if (res.status === 200) {
  //       setUserData(res.data);
  //     } else {
  //       toast.error("Unable to retrieve the profile");
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //     toast.error(error.message);
  //   }
  // };
  const contextValue = {
    backEndUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    // getUserData,
    getUserData,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
