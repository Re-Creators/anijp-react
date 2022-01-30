import { useParams } from "react-router-dom";
import { useUserPlaylist } from "../../hooks/useUserPlaylist";
import PlaylistDetail from "../../components/mobile/playlist/PlaylistDetail";

function UserPlaylistMobile() {
  const { id } = useParams();
  const { data } = useUserPlaylist(id);

  if (!data) return null;
  return <PlaylistDetail detail={data} />;
}

export default UserPlaylistMobile;
