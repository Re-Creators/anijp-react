import { BrowserRouter, Routes, Route } from "react-router-dom";
import Collection from "./pages/Collection";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import MyPlaylist from "./pages/MyPlaylist";
import Playlist from "./pages/Playlist";
import Register from "./pages/Register";
import { auth } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
    }
  });
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="playlist/:id" element={<Playlist />} />
            <Route path="myplaylist/:id" element={<MyPlaylist />} />
            <Route path="collection" element={<Collection />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
