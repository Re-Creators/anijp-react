import { useParams } from "react-router-dom";
import { useUserPlaylist } from "../../hooks/useUserPlaylist";
import PlaylistDetail from "../../components/mobile/playlist/PlaylistDetail";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { useEffect } from "react";

function UserPlaylistMobile() {
  const { id } = useParams();
  const { data } = useUserPlaylist(id);

  const { setTitle } = useDocumentTitle();

  useEffect(() => {
    if (data) {
      setTitle(`${data.name} | AniJP Playlist`);
    }
  }, [data, setTitle]);

  if (!data) return null;
  return <PlaylistDetail detail={data} />;
}

export default UserPlaylistMobile;
