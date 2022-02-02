import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectUser } from "../../features/user/userSlice";
import { authApp } from "../../firebase-config";
import useHelmetTitle from "../../hooks/useHelmetTitle";

function Account() {
  const user = useSelector(selectUser);
  const { setTitle } = useHelmetTitle();

  useEffect(() => {
    setTitle(`${user.username} Profile | AniJP`);
  }, [user, setTitle]);

  const logoutHandler = () => {
    signOut(authApp)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!user) return <Navigate to="/" />;
  return (
    <div className="flex h-full w-full flex-col text-white">
      <button
        className="mr-3 mt-3 self-end border-2 px-3 py-1 text-sm"
        onClick={logoutHandler}
      >
        Logout
      </button>

      <div className="mx-auto my-24 text-center">
        <img
          src={user.photo}
          alt=""
          className="mb-3 h-40 w-40 rounded-full object-cover object-center"
        />
        <span className="capitalize">{user.username}</span>
      </div>
    </div>
  );
}

export default Account;
