import { Link } from "react-router-dom";

import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  login,
  loginWithGoogle,
  selectError,
  selectisLoading,
} from "../../features/user/userSlice";
import { useSelector } from "react-redux";
import Spinner from "../UI/Spinner";
import useScreenCheck from "../../hooks/useScreenCheck";

function MainLogin({
  parentClassNames,
  formClasssNames,
  formContainerClassNames,
  sidePanelClassNames,
}) {
  const dispatch = useDispatch();
  const device = useScreenCheck();

  const isLoading = useSelector(selectisLoading);
  const error = useSelector(selectError);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e) => {
    if (email !== "" && password !== "") {
      e.preventDefault();
      try {
        await dispatch(login({ email, password })).unwrap();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className={parentClassNames}>
      <div className={formContainerClassNames}>
        <div className={formClasssNames}>
          <h1 className="text-center mb-10 text-4xl">Sign In</h1>
          <div
            className="w-full flex flex-row items-center mb-5 py-4 px-3 rounded-md border-2 cursor-pointer hover:bg-gray-200"
            onClick={() => dispatch(loginWithGoogle(device))}
          >
            <img src="/icons/google.svg" alt="" className="h-5 mr-3" />
            <span>Sign in with Google</span>
          </div>
          <div className="flex flex-row items-center mb-5">
            <div className="border-t-2 flex-grow"></div>
            <span className="mx-2 text-sm text-gray-400">
              or Sign in with email
            </span>
            <div className="border-t-2 flex-grow"></div>
          </div>
          <form className="flex flex-col" onSubmit={loginHandler}>
            <div className="flex flex-col">
              <span>Email</span>
              <input
                type="email"
                value={email}
                className="w-full px-3 py-3 border-2  border-primary mt-1 text-sm"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              {error?.email && (
                <span className="mt-3 text-xs text-red-500 italic">
                  {error.email}
                </span>
              )}
            </div>
            <div className="flex flex-col mt-5">
              <span>Password</span>
              <input
                type="password"
                value={password}
                className="w-full px-3 py-3 border-2 border-primary mt-1 text-sm"
                placeholder="Enter your password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />

              {error?.password && (
                <span className="mt-3 text-xs text-red-500 italic">
                  {error.password}
                </span>
              )}
            </div>
            <button
              className="w-full py-3 bg-secondary text-white mt-5 rounded-lg"
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

export default MainLogin;
