import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { auth } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "./features/user/userSlice";
import { getUserData } from "./features/user/userSlice";
import AuthLayout from "./pages/AuthLayout";
import useScreenCheck from "./hooks/useScreenCheck";
import MobileRoute from "./router/MobileRoute";
import DesktopRoute from "./router/DesktopRoute";
import HelmetSetter from "./components/helmet/HelmetSetter";

const renderRoute = (screen) => {
  if (screen === "DESKTOP") return DesktopRoute;
  else if (screen === "MOBILE") return MobileRoute;
  return undefined;
};

function App() {
  const dispatch = useDispatch();
  const screen = useScreenCheck();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setLoggedIn(true));
      dispatch(getUserData(user.uid));
    }
  });

  return (
    <>
      <BrowserRouter>
        <HelmetSetter />
        <Routes>
          {renderRoute(screen)}
          <Route
            path="/login"
            element={
              <AuthLayout>
                <Login />
              </AuthLayout>
            }
          />
          <Route
            path="/register"
            element={
              <AuthLayout>
                <Register />
              </AuthLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
