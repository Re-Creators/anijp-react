import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectUser } from "../../features/user/userSlice";
import { authApp } from "../../firebase-config";

function Account() {
  const user = useSelector(selectUser);

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
    <div className="text-white h-full w-full flex flex-col">
      <button
        className="self-end mr-3 mt-3 border-2 px-3 py-1 text-sm"
        onClick={logoutHandler}
      >
        Logout
      </button>

      <div className="mx-auto my-24 text-center">
        <img
          src={user.photo}
          alt=""
          className="w-40 h-40 object-cover object-center rounded-full mb-3"
        />
        <span className="capitalize">{user.username}</span>
      </div>
    </div>
  );
}

export default Account;
