import { useParams } from "react-router-dom";
import PlaylistDetail from "../../components/mobile/playlist/PlaylistDetail";
import usePlaylistDetail from "../../hooks/usePlaylistDetail";

function PlaylistMobile() {
  const { id } = useParams();
  const { data, status } = usePlaylistDetail(id);

  if (status === "loading" || status === "error") return null;
  return <PlaylistDetail detail={data} />;
}

export default PlaylistMobile;
