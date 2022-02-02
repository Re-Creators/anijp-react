import { Route } from "react-router-dom";
import RequireAuth from "../components/RequireAuth";
import Collection from "../pages/Collection";
import Account from "../pages/mobile/Account";
import HomeMobile from "../pages/mobile/HomeMobile";
import MobileLayout from "../pages/mobile/MobileLayout";
import PlaylistMobile from "../pages/mobile/PlaylistMobile";
import UserPlaylistMobile from "../pages/mobile/UserPlaylistMobile";
import Search from "../pages/Search";
import SearchResult from "../pages/SearchResult";

const MobileRoute = (
  <>
    <Route path="/" element={<MobileLayout />}>
      <Route index element={<HomeMobile />} />
      <Route path="playlist/:id" element={<PlaylistMobile />} />
      <Route path="myplaylist/:id" element={<UserPlaylistMobile />} />
      <Route path="collection" element={<Collection />} />
      <Route
        path="account"
        element={
          <RequireAuth>
            <Account />
          </RequireAuth>
        }
      />
      <Route path="search" element={<Search />}>
        <Route path=":keyword" element={<SearchResult />} />
      </Route>
    </Route>
  </>
);

export default MobileRoute;
