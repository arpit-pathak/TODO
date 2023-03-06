import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
// Contexts
import { UserContext } from "./context/UserContext";

// Components
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import SignUp from "./components/Signup/Signup";

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers = {
  Authorization: sessionStorage.getItem("bearerToken"),
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  // Check if user is signed in
  const checkisLoggedIn = async () => {
    const { data } = await axios
      .get("/api/u/isloggedin")
      .catch((error) => error.response);

    if (!data.success) {
      setIsLoggedIn(false);
      return toast("Sign in/Sign up first", { type: "warning" });
    }

    setUserInfo(data.user);
    setIsLoggedIn(true);
  };

  useEffect(() => {
    checkisLoggedIn();
  }, [setIsLoggedIn]);

  return (
    <>
      <UserContext.Provider
        value={{
          isLoggedIn,
          setIsLoggedIn,
          userInfo,
          setUserInfo,
        }}
      >
        <ToastContainer position="top-right" autoClose={2000} />

        <Routes>
          <Route path="/" element={isLoggedIn ? <Dashboard /> : <Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
