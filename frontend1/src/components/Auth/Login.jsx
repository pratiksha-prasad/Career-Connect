import React, { useContext, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://job-app-1-n7z7.onrender.com/api/v1/user/login",
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthorized) {
    return <Navigate to={'/'} />;
  }

  return (
    <>
      <section className="authPage">
        <div className="container">
          <div className="header">
            <img src="/career.png" alt="logo" />
            <h3>Login to your account</h3>
          </div>
          <form>
            <div className="inputTag">
              <label>Login As</label>
              <div>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Select Role</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
                <FaRegUser />
              </div>
            </div>
            <div className="inputTag">
              <label>Email Address</label>
              <div>
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdOutlineMailOutline />
              </div>
            </div>
            <div className="inputTag">
              <label>Password</label>
              <div style={{
                  display: "flex",
                  alignItems: "center",
                  height: "46px",
                }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ flex: 1 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    backgroundColor: "#203d8e",
                    color: "white",
                    cursor: "pointer",
                    height: "75px",
                    width: "47px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "none",
                    borderRadius: "5px",
                  }}
                >
                  {showPassword ? (
                    <RiEyeOffFill style={{ fontSize: "20px", color: "white" }} />
                    ) : (
                    <RiEyeFill style={{ fontSize: "20px", color: "white" }} />
                    )
                }
                </button>
              </div>
            </div>
            <button type="submit" onClick={handleLogin}>
              Login
            </button>
            <Link to={"/register"}>Register Now</Link>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
