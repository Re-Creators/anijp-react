import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../../features/user/userSlice";
import { authApp } from "../../firebase-config";
import { signOut } from "firebase/auth";
import PortalContainer from "../portal/PortalContainer";
import EditProfileModal from "../modals/EditProfileModal";

function Topbar() {
  const user = useSelector(selectUser);
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const logout = () => {
    signOut(authApp)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <header className="fixed top-0 left-0 z-10 flex w-[765px] flex-row justify-end bg-primary py-3 px-10 shadow-md md:w-full">
      <PortalContainer
        isShow={showModal}
        zIndex={50}
        onClose={() => setShowModal(false)}
      >
        <EditProfileModal onClose={() => setShowModal(false)} />
      </PortalContainer>
      {user ? (
        <div className="relative flex flex-row items-center">
          <span className="mr-3 text-sm capitalize text-white">
            {user.username}
          </span>
          <img
            src={user.photo}
            alt="user-placeholder"
            className="h-8 w-8 cursor-pointer rounded-full"
            onClick={() => setShowMenu(!showMenu)}
          />

          {showMenu && (
            <div className="absolute top-12 right-0 flex min-w-[150px] flex-col rounded-lg bg-primary-300 px-1 py-1 text-white">
              <button
                className="rounded-md px-3 py-2 hover:bg-primary"
                onClick={() => {
                  setShowMenu(false);
                  setShowModal(true);
                }}
              >
                Edit Profile
              </button>
              <button
                onClick={logout}
                className="rounded-md px-3 py-2 hover:bg-primary"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-row items-center text-white">
          <Link to="/register" className="mr-5">
            REGISTER
          </Link>
          <Link to="/login" className="rounded-full bg-secondary px-10 py-2">
            LOGIN
          </Link>
        </div>
      )}
    </header>
  );
}

export default Topbar;
