import { NavLink, useNavigate } from "react-router-dom";
import { Assets } from "../assets/assets";
import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../context/AppContext";
import { useState } from "react";
import { logout, sendOtp } from "../api/api";
import { toast } from "react-toastify";
// import logoHome from "../assets/logoHome.png";

export const Menubar = () => {
  const navigate = useNavigate();
  const { userData, setUserData, setIsLoggedIn } = useContext(AppContext);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const dropDownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setDropDownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const res = await logout();
      console.log(res);
      if (res.status === 200) {
        setIsLoggedIn(false);
        setUserData(false);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.res.data.message);
    }
  };
  const sendVerificationOtp = async () => {
    try {
      const res = await sendOtp();
      console.log(res);
      if (res.status === 200) {
        navigate("/email-verify");
        toast.success("OTP has been sent successfully.");
      } else {
        toast.error("Unable to send OTP!");
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <nav className="navbar bg-white px-5 py-4 d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center gap-2">
        <img src="/images/tick.jpg" alt="logo" width={32} height={32} />
        <NavLink to="/">
          <span className="fw-bold fs-4 text-dark">Authify</span>
        </NavLink>
      </div>
      {userData ? (
        <div className="position-relative" ref={dropDownRef}>
          <div
            className="bg-dark text-white rounded-circle d-flex justify-content-center align-items-center"
            style={{
              width: "40px",
              height: "40px",
              cursor: "pointer",
              userSelect: "none",
            }}
            onClick={() => setDropDownOpen((prev) => !prev)}
          >
            {userData.name[0].toUpperCase()}
          </div>
          {dropDownOpen && (
            <div
              className="position-absolute shadow bg-white rounded p-2"
              style={{
                top: "50px",
                right: 0,
                zIndex: 100,
              }}
            >
              {!userData.isAccountVerified && (
                <div
                  className="dropdown-item py-1 px-2 "
                  style={{ cursor: "pointer" }}
                  onClick={sendVerificationOtp}
                >
                  Verify Email
                </div>
              )}
              <div
                className="dropdown-item py-1 px-2 text-danger"
                style={{ cursor: "pointer" }}
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      ) : (
        <NavLink to="/login">
          <div className="btn btn-outline-dark rounded-pill px-3">
            Login <i className="bi bi-arrow-right ms-2"></i>
          </div>
        </NavLink>
      )}
    </nav>
  );
};
