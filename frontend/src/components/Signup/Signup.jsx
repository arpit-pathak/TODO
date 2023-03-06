import styles from "./signupStyle.module.css";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowpassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!(name && email && password)) {
      return toast("All fields are mandatory", { type: "error" });
    }

    const data = {
      name,
      email,
      password,
    };

    const creatUser = await axios
      .post("/api/u/register", data)
      .catch((error) => {
        return error.response;
      });

    if (!creatUser.data.success) {
      return toast(creatUser.data.message, { type: "error" });
    }

    toast(creatUser.data.message, { type: "success" });

    navigate("/login");
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              Sing in
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1 className={styles.heading}>Create Account</h1>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={(e) => setName(e.target.value)}
              // value={data.firstName}
              required
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              // value={data.email}
              required
              className={styles.input}
            />
            <div className="relative">
              <input
                // type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                // value={data.password}
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
              Sing Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
