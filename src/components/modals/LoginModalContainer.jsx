import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import PortalContainer from "../portal/PortalContainer";
import LoginModal from "./LoginModal";
import { toggleLoginModal } from "../../features/modals/modalSlice";

function LoginModalContainer() {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.modal.showModal);

  return (
    <div>
      <PortalContainer
        isShow={showModal}
        onClose={() => dispatch(toggleLoginModal())}
        zIndex={50}
      >
        <LoginModal />
      </PortalContainer>
    </div>
  );
}

export default LoginModalContainer;
