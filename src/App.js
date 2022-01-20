import { BrowserRouter, Routes, Route } from "react-router-dom";
import Collection from "./pages/Collection";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import UserPlaylist from "./pages/UserPlaylist";
import Playlist from "./pages/Playlist";
import Register from "./pages/Register";
import { auth } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "./features/user/userSlice";
import { getUserData } from "./features/user/userSlice";
import AuthLayout from "./pages/AuthLayout";

function App() {
  const dispatch = useDispatch();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setLoggedIn(true));
      dispatch(getUserData(user.uid));
    }
  });

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="playlist/:id" element={<Playlist />} />
            <Route path="myplaylist/:id" element={<UserPlaylist />} />
            <Route path="collection" element={<Collection />} />
          </Route>
          <Route
            path="/login"
            element={
              <AuthLayout>
                {" "}
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
