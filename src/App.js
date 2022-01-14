import { BrowserRouter, Routes, Route } from "react-router-dom";
import Collection from "./pages/Collection";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import MyPlaylist from "./pages/MyPlaylist";
import Playlist from "./pages/Playlist";
function App() {
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
