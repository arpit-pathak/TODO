import styles from "./loginStyle.module.css";
import React, { useContext, useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowpassword] = useState(false);
  const { setIsLoggedIn, setUserInfo } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!(email && password)) {
      return toast("All fields are mandatory", { type: "error" });
    }

    const data = {
      email,
      password,
    };

    const request = await axios.post("api/u/login", data).catch((error) => {
      return error.response;
    });
    let token = "Bearer " + request.data.token;
    sessionStorage.setItem("bearerToken", token);

    if (!request.data.success) {
      return toast(request.data.message, { type: "error" });
    }

    toast(request.data.message, { type: "success" });
    setIsLoggedIn(true);
    setUserInfo(request.data.user);

    navigate("/");
  };
  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1 className={styles.heading}>Login to Your Account</h1>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              placeholder="example@gmail.com"
              required
              className={styles.input}
            />
            <div className="relative">
              <input
                placeholder="Password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                required
                className={styles.input}
                type={showPassword ? "text" : "password"}
              />

              {showPassword ? (
                <div className="absolute bottom-[18px] right-[15px]">
                  <FaEye
                    className=" text-slate-500"
                    size="1.5rem"
                    onClick={() => setShowpassword(false)}
                  />
                </div>
              ) : (
                <div className="absolute bottom-[18px] right-[15px] ">
                  <FaEyeSlash
                    className="text-slate-500"
                    size="1.5rem"
                    onClick={() => setShowpassword(true)}
                  />
                </div>
              )}
            </div>
            <button type="submit" className={styles.green_btn}>
              Log In
            </button>
          </form>
        </div>
        <div className={styles.right}>
          <h1>New Here ?</h1>
          <Link to="/register">
            <button type="button" className={styles.white_btn}>
              Sing Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
