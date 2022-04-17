import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  login,
  loginWithGoogle,
  selectisLoading,
} from "../../features/user/userSlice";
import { useSelector } from "react-redux";
import Spinner from "../UI/Spinner";
import useScreenCheck from "../../hooks/useScreenCheck";
import { getErrorMessage } from "../../utils";

function MainLogin({
  parentClassNames,
  formClasssNames,
  formContainerClassNames,
  sidePanelClassNames,
}) {
  const dispatch = useDispatch();
  const device = useScreenCheck();
  const navigate = useNavigate();

  const isLoading = useSelector(selectisLoading);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e) => {
    if (email !== "" && password !== "") {
      e.preventDefault();
      try {
        await dispatch(login({ email, password })).unwrap();
        navigate("/");
      } catch (err) {
        setError(getErrorMessage(err));
      }
    }
  };

  return (
    <div className={parentClassNames}>
      <div className={formContainerClassNames}>
        <div className={formClasssNames}>
          <h1 className="mb-10 text-center text-4xl">Sign In</h1>
          <div
            className="mb-5 flex w-full cursor-pointer flex-row items-center rounded-md border-2 py-4 px-3 hover:bg-gray-200"
            onClick={() => dispatch(loginWithGoogle(device))}
          >
            <img src="/icons/google.svg" alt="" className="mr-3 h-5" />
            <span>Sign in with Google</span>
          </div>
          <div className="mb-5 flex flex-row items-center">
            <div className="flex-grow border-t-2"></div>
            <span className="mx-2 text-sm text-gray-400">
              or Sign in with email
            </span>
            <div className="flex-grow border-t-2"></div>
          </div>
          <form className="flex flex-col" onSubmit={loginHandler}>
            <div className="flex flex-col">
              <span>Email</span>
              <input
                type="email"
                value={email}
                className="border-primary mt-1 w-full border-2  px-3 py-3 text-sm"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              {error?.email && (
                <span className="mt-3 text-xs italic text-red-500">
                  {error.email}
                </span>
              )}
            </div>
            <div className="mt-5 flex flex-col">
              <span>Password</span>
              <input
                type="password"
                value={password}
                className="border-primary mt-1 w-full border-2 px-3 py-3 text-sm"
                placeholder="Enter your password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />

              {error?.password && (
                <span className="mt-3 text-xs italic text-red-500">
                  {error.password}
                </span>
              )}
            </div>
            <button
              className="bg-secondary mt-5 w-full rounded-lg py-3 text-white"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : "Sign In"}
            </button>
            <div className="mt-5 text-sm">
              Not Registered yet ?{" "}
              <Link to="/register" className="text-secondary">
                Create an account
              </Link>
            </div>
          </form>
        </div>
      </div>

      <div className={sidePanelClassNames}>
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

export default MainLogin;
