import React, { useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/UI/Spinner";
import { useSelector } from "react-redux";
import { register, selectisLoading } from "../features/user/userSlice";
import { useDispatch } from "react-redux";
import useHelmetTitle from "../hooks/useHelmetTitle";
import { getErrorMessage } from "../utils";

function Register() {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectisLoading);
  const [error, setError] = useState(null);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (email !== "" && password !== "") {
        await dispatch(register({ username, email, password })).unwrap();
      }
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  useHelmetTitle("Register | AniJP", dispatch);
  return (
    <div className="flex flex-row">
      <div className="relative flex min-h-screen w-full  items-center justify-center bg-white md:w-1/2">
        <div className="w-full p-10 lg:w-2/3">
          <h1 className="mb-10 text-center text-4xl">Sign Up</h1>
          <form
            className="flex flex-col "
            onSubmit={submitHandler}
            autoComplete="off"
          >
            <div className="flex flex-col">
              <span>Username</span>
              <input
                type="text"
                className="border-primary mt-1 w-full border-2  px-3 py-3 text-sm"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value.trim())}
                required
              />
            </div>
            <div className="mt-5 flex flex-col">
              <span>Email</span>
              <input
                type="email"
                className="border-primary mt-1 w-full border-2  px-3 py-3 text-sm"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {error && (
                <span className="mt-3 text-xs italic text-red-500">
                  {error}
                </span>
              )}
            </div>
            <div className="mt-5 flex flex-col">
              <span>Password</span>
              <input
                type="password"
                className="border-primary mt-1 w-full border-2 px-3 py-3 text-sm"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value.trim())}
                required
              />
            </div>
            <button
              type="sumbit"
              className="bg-secondary mt-5 w-full rounded-lg py-3 text-white"
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

      <div className="hidden h-full min-h-screen flex-col justify-between md:flex md:w-1/2">
        <div className="my-auto flex w-full flex-col items-center">
          <img src="/logo_anijp.svg" alt="" className="w-32" />
          <h1 className="font-bold text-white md:text-4xl lg:text-5xl">
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
