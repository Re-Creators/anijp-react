import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../features/user/userSlice";
import { authApp } from "../firebase-config";
import { signOut } from "firebase/auth";
import PortalContainer from "./portal/PortalContainer";
import EditProfileModal from "./modals/EditProfileModal";

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
    <header className="w-full z-10 bg-primary py-3 px-10 fixed top-0 left-0 flex flex-row justify-end shadow-md">
      <PortalContainer
        isShow={showModal}
        zIndex={50}
        onClose={() => setShowModal(false)}
      >
        <EditProfileModal onClose={() => setShowModal(false)} />
      </PortalContainer>
      {user ? (
        <div className="flex flex-row items-center relative">
          <span className="text-white text-sm mr-3 capitalize">
            {user.username}
          </span>
          <img
            src={user.photo}
            alt="user-placeholder"
            className="w-8 h-8 rounded-full cursor-pointer"
            onClick={() => setShowMenu(!showMenu)}
          />

          {showMenu && (
            <div className="min-w-[150px] absolute bg-primary-300 px-1 py-1 text-white top-12 right-0 rounded-lg flex flex-col">
              <button
                className="px-3 py-2 hover:bg-primary rounded-md"
                onClick={() => {
                  setShowMenu(false);
                  setShowModal(true);
                }}
              >
                Edit Profile
              </button>
              <button
                onClick={logout}
                className="px-3 py-2 hover:bg-primary rounded-md"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-row text-white items-center">
          <Link to="/register" className="mr-5">
            REGISTER
          </Link>
          <Link to="/login" className="px-10 py-2 rounded-full bg-secondary">
            LOGIN
          </Link>
        </div>
      )}
    </header>
  );
}

export default Topbar;
