import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import PortalContainer from "../portal/PortalContainer";
import { toggleLoginModal } from "../../features/modals/modalSlice";
import MainLogin from "../login/MainLogin";
import { selectIsLoggedIn } from "../../features/user/userSlice";

function LoginModalContainer() {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.modal.showModal);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(toggleLoginModal());
    }
  }, [isLoggedIn]);

  return (
    <div>
      <PortalContainer
        isShow={showModal}
        onClose={() => dispatch(toggleLoginModal())}
        zIndex={50}
      >
        <MainLogin
          parentClassNames="modal w-4/5 lg:w-4/6 bg-primary flex flex-row h-[568px]"
          formClasssNames="w-4/5 lg:w-2/3"
          formContainerClassNames="w-full md:w-1/2 bg-white relative flex items-center justify-center"
          sidePanelClassNames="hidden md:w-1/2 h-full md:flex flex-col justify-between"
        />
      </PortalContainer>
    </div>
  );
}

export default LoginModalContainer;
