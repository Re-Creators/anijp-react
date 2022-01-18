import { Link, useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, authApp } from "../firebase-config";
import { setDoc, doc } from "firebase/firestore";
import { useState, useRef } from "react";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState({
    email: null,
    password: null,
  });
  const emailError = useRef(false);
  const passwordError = useRef(false);

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const newUserRef = doc(db, "users", user.uid);

        setDoc(newUserRef, {
          username: user.displayName,
          email: user.email,
          photo: user.photoURL,
          likedPlaylist: [],
          likedSong: [],
        })
          .then(() => {
            navigate("/");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loginHandler = (e) => {
    if (email !== "" && password !== "") {
      e.preventDefault();
      emailError.current = false;
      passwordError.current = false;

      signInWithEmailAndPassword(authApp, email, password)
        .then(() => {
          navigate("/");
        })
        .catch((err) => {
          if (err.code === "auth/invalid-email") {
            emailError.current = true;
            setErrorMsg({ password: null, email: "Enter a valid email" });
          } else if (err.code === "auth/wrong-password") {
            passwordError.current = true;
            setErrorMsg({
              email: null,
              password: "Password doesn't match with our records",
            });
          } else if (err.code === "auth/user-not-found") {
            emailError.current = true;
            setErrorMsg({ password: null, email: "User not found" });
          }
        });
    }
  };
  return (
    <div className="w-full h-screen flex flex-row">
      <div className="w-full md:w-1/2 bg-white h-full relative flex items-center justify-center">
        <div className="p-10 w-full lg:w-2/3">
          <h1 className="text-center mb-10 text-4xl">Sign In</h1>
          <div
            className="w-full flex flex-row items-center mb-5 py-4 px-3 rounded-md border-2 cursor-pointer hover:bg-gray-200"
            onClick={loginWithGoogle}
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
          <form className="flex flex-col ">
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

              {errorMsg.email && (
                <span className="mt-3 text-xs text-red-500 italic">
                  {errorMsg.email}
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

              {errorMsg.password && (
                <span className="mt-3 text-xs text-red-500 italic">
                  {errorMsg.password}
                </span>
              )}
            </div>
            <button
              className="w-full py-3 bg-secondary text-white mt-5 rounded-lg"
              onClick={loginHandler}
            >
              Sign In
            </button>
            <div className="mt-5 text-sm">
              Not Registered yet ?{" "}
              <Link to="/register" className="text-secondary">
                Create an account
              </Link>
            </div>
          </form>
        </div>

        <div className="bar hidden lg:block"></div>
      </div>

      <div className="hidden md:w-1/2 h-full md:flex flex-col justify-between">
        <div className="flex flex-col w-full items-center my-auto">
          <img src="/logo_anijp.svg" alt="" className="w-32" />
          <h1 className="text-white md:text-4xl lg:text-5xl font-bold">
            Music For Life
          </h1>
        </div>
        <div className="relative h-2/3 ">
          <img
            src="/images/chara.png"
            alt=""
            className="md:w-4/5 lg:w-1/2 h-full absolute bottom-0 right-0"
          />
          <div className="absolute md:-left-20 lg:left-10 bottom-10">
            <svg
              width="506"
              height="507"
              viewBox="0 0 506 507"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="md:w-72 lg:w-96"
            >
              <path
                d="M203.563 405.965L203.566 405.965L200.886 401.416L189.64 382.158L185.61 375.255L184.478 375.592L164.668 381.488L179.9 407.592L179.945 407.766L176.343 408.721C175.949 408.748 175.572 408.813 175.218 408.916C172.586 409.699 172.833 413.197 174.148 415.364C175.464 417.531 178.663 418.653 181.295 417.869C183.891 417.097 184.986 414.025 183.753 411.862L183.756 411.861L181.076 407.313L171.679 391.993L190.738 386.321L189.947 385.018L170.881 390.693L169.72 388.799L188.86 383.102L188.997 383.338L199.709 401.696L199.754 401.87L196.152 402.825C195.758 402.851 195.382 402.917 195.027 403.02C192.395 403.803 192.643 407.301 193.958 409.468C195.273 411.635 198.473 412.757 201.105 411.973C203.7 411.201 204.795 408.129 203.563 405.965Z"
                fill="white"
              />
              <path
                d="M246.144 507C241.356 496.743 249.144 491.598 249.144 491.598C253.019 487.13 247.298 482.854 247.298 482.854L245.146 481.371C244.54 480.267 243.697 479.236 242.698 478.374L239.536 476C245.027 483.204 240.951 486.432 240.951 486.432L237.717 491.661L225.197 470.813L230.153 469.499C230.7 469.463 231.224 469.372 231.716 469.229C235.371 468.141 235.028 463.283 233.201 460.273C231.374 457.263 226.93 455.705 223.275 456.793C219.67 457.867 218.149 462.133 219.861 465.138L219.857 465.139L223.579 471.456L223.696 471.409L246.144 507ZM244.792 491.138L241.372 495.834C241.21 492.15 242.458 489.025 244.893 487.014C245.615 486.162 245.96 485.005 245.882 483.692C246.505 485.18 246.733 486.663 246.54 487.978C246.348 489.292 245.743 490.386 244.792 491.138L244.792 491.138Z"
                fill="white"
              />
              <path
                d="M175.136 322.164L175.141 322.163L171.418 315.846L155.473 289.851L164 291.667C165.973 291.701 168.148 292.53 170.069 293.981C171.99 295.432 173.508 297.393 174.306 299.453L174.257 296.153C174.257 296.153 173.83 290.301 166.548 289.154C166.548 289.154 155.852 289.511 148.629 279.978L169.785 316.235L169.847 316.476L164.844 317.803C164.297 317.839 163.774 317.929 163.281 318.073C159.626 319.161 159.97 324.019 161.796 327.029C163.623 330.038 168.067 331.596 171.722 330.508C175.328 329.435 176.848 325.168 175.136 322.164Z"
                fill="white"
              />
              <path
                d="M271.123 377.698L266.12 379.024C265.573 379.061 265.05 379.151 264.558 379.295C260.902 380.382 261.246 385.241 263.072 388.25C264.899 391.26 269.343 392.818 272.998 391.73C276.604 390.657 278.125 386.39 276.412 383.386L276.417 383.385L272.694 377.068L259.643 355.791L286.114 347.912L285.016 346.103L258.535 353.984L256.921 351.353L283.505 343.441L283.696 343.769L298.574 369.267L298.637 369.508L293.634 370.835C293.087 370.871 292.564 370.962 292.071 371.105C288.416 372.193 288.759 377.051 290.586 380.061C292.413 383.071 296.857 384.629 300.512 383.541C304.118 382.468 305.638 378.201 303.926 375.196L303.931 375.195L300.208 368.878L285.081 342.972L285.08 342.971L284.589 342.131L278.991 332.543L249.906 341.2L271.061 377.456L271.123 377.698Z"
                fill="white"
              />
              <path
                d="M271.198 192.077L271.206 192.075L264.798 181.2L237.349 136.452L252.027 139.579C252.027 139.579 263.798 139.543 269.769 152.982L269.684 147.301C269.684 147.301 268.95 137.227 256.414 135.252C256.414 135.252 238.002 135.866 225.568 119.457L261.985 181.87L262.093 182.285L253.481 184.569C252.539 184.632 251.639 184.787 250.791 185.034C244.499 186.907 245.089 195.27 248.234 200.451C251.379 205.632 259.029 208.314 265.321 206.441C271.528 204.594 274.146 197.249 271.198 192.077Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;