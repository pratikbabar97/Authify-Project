import { NavLink, useNavigate } from "react-router-dom";
import { Assets } from "../assets/assets";
import { useContext, useState } from "react";

import { login, register } from "../api/api";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

export const Login = () => {
  const [createAccount, setCreateAccount] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setIsLoggedIn, getUserData } = useContext(AppContext);
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (createAccount) {
        //register api
        const res = await register({ name, email, password });
        if (res.status === 201) {
          navigate("/");
          toast.success("Account created successfully.");
        } else {
          toast.error("Email already exists.");
        }
      } else {
        //login api
        const res = await login({ email, password });
        if (res.status === 200) {
          setIsLoggedIn(true);
          // getUserData();
          getUserData();
          navigate("/");
        } else {
          toast.error("Email/Password is incorrect");
        }
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="position-relative min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: "linear-gradient(90deg, #6a5af9, #8268f9)",
        border: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "30px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <NavLink
          to="/"
          style={{
            display: "flex",
            gap: 5,
            alignItems: "center",
            fontWeight: "bold",
            fontSize: "24px",
            textDecoration: "none",
          }}
        >
          <img src="/images/tick.jpg" alt="logo" width={32} />
          <span className="fw-bold fs-4 text-light">Authify</span>
        </NavLink>
      </div>
      <div className="card p-4" style={{ maxWidth: "500px", width: "100%" }}>
        <h2 className="text-center mb-4">
          {createAccount ? "Create Account" : "Login"}
        </h2>
        <form onSubmit={(e) => handleOnSubmit(e)}>
          {createAccount && (
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                className="form-control"
                placeholder="Enter Full Name"
                required
                name="fullName"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Id
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter Email"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="**************"
              required
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-between mb-3">
            <NavLink to="/reset-password" className="text-decoration-none">
              Forgot Password ?
            </NavLink>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Loading...." : createAccount ? "Register" : "Login"}
          </button>
        </form>
        <div className="text-center mt-3">
          <p className="mb-0">
            {createAccount ? (
              <>
                Already have an account?{" "}
                <span
                  onClick={() => setCreateAccount(false)}
                  className="text-decoration-underline"
                  style={{ cursor: "pointer" }}
                >
                  Login Here
                </span>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <span
                  onClick={() => setCreateAccount(true)}
                  className="text-decoration-underline"
                  style={{ cursor: "pointer" }}
                >
                  Sign Up
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
