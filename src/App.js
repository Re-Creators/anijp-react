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

function App() {
  const dispatch = useDispatch();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
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
