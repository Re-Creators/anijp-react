import React, { useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/UI/Spinner";
import { useSelector } from "react-redux";
import {
  register,
  selectError,
  selectisLoading,
} from "../features/user/userSlice";
import { useDispatch } from "react-redux";

function Register() {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectisLoading);
  const error = useSelector(selectError);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(register({ username, email, password }));
  };

  return (
    <div className="flex flex-row">
      <div className="w-full md:w-1/2 bg-white min-h-screen  relative flex items-center justify-center">
        <div className="p-10 w-full lg:w-2/3">
          <h1 className="text-center mb-10 text-4xl">Sign Up</h1>
          <form
            className="flex flex-col "
            onSubmit={submitHandler}
            autoComplete="off"
          >
            <div className="flex flex-col">
              <span>Username</span>
              <input
                type="text"
                className="w-full px-3 py-3 border-2  border-primary mt-1 text-sm"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col mt-5">
              <span>Email</span>
              <input
                type="email"
                className="w-full px-3 py-3 border-2  border-primary mt-1 text-sm"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {error && (
                <span className="mt-3 text-xs text-red-500 italic">
                  {error}
                </span>
              )}
            </div>
            <div className="flex flex-col mt-5">
              <span>Password</span>
              <input
                type="password"
                className="w-full px-3 py-3 border-2 border-primary mt-1 text-sm"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="sumbit"
              className="w-full py-3 bg-secondary text-white mt-5 rounded-lg"
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : " Sign Up"}
            </button>
            <div className="mt-5 text-sm">
              Already have an account ?
              <Link to="/login" className="text-secondary">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>

      <div className="hidden md:w-1/2 h-full min-h-screen md:flex flex-col justify-between">
        <div className="flex flex-col w-full items-center my-auto">
          <img src="/logo_anijp.svg" alt="" className="w-32" />
          <h1 className="text-white md:text-4xl lg:text-5xl font-bold">
            Music For Life
          </h1>
        </div>
        <div className="relative">
          <img src="/images/login-girl.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Register;
