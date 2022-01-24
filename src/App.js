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
import FavoriteSong from "./pages/FavoriteSongs";
import RequireAuth from "./components/RequireAuth";
import Search from "./pages/Search";
import SearchResult from "./pages/SearchResult";
import useScreenCheck from "./hooks/useScreenCheck";
import MobileLayout from "./pages/mobile/MobileLayout";
import HomeMobile from "./pages/mobile/HomeMobile";

const DesktopScreen = (
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="playlist/:id" element={<Playlist />} />
    <Route path="search" element={<Search />}>
      <Route path=":keyword" element={<SearchResult />} />
    </Route>
    <Route
      path="myplaylist/:id"
      element={
        <RequireAuth>
          <UserPlaylist />
        </RequireAuth>
      }
    />
    <Route path="collection" element={<Collection />} />
    <Route
      path="favorite"
      element={
        <RequireAuth>
          <FavoriteSong />
        </RequireAuth>
      }
    />
  </Route>
);

const renderScreen = (screen) => {
  if (screen === "DESKTOP") return DesktopScreen;
  else if (screen === "MOBILE") return MobileScreen;
  return undefined;
};

const MobileScreen = (
  <>
    <Route path="/" element={<MobileLayout />}>
      <Route index element={<HomeMobile />} />
    </Route>
  </>
);

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
        <Routes>
          {renderScreen(screen)}
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
