import { Route } from "react-router-dom";
import RequireAuth from "../components/require-auth/RequireAuth";
import Collection from "../pages/Collection";
import FavoriteSong from "../pages/FavoriteSongs";
import Home from "../pages/Home";
import Layout from "../pages/Layout";
import Playlist from "../pages/Playlist";
import Search from "../pages/Search";
import SearchResult from "../pages/SearchResult";
import UserPlaylist from "../pages/UserPlaylist";

const DesktopRoute = (
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

export default DesktopRoute;
