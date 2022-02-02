import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PlaylistDetail from "../../components/mobile/playlist/PlaylistDetail";
import useHelmetTitle from "../../hooks/useHelmetTitle";
import usePlaylistDetail from "../../hooks/usePlaylistDetail";

function PlaylistMobile() {
  const { id } = useParams();
  const { data, status } = usePlaylistDetail(id);

  const { setTitle } = useHelmetTitle();

  useEffect(() => {
    if (data) {
      setTitle(`${data.name} | AniJP Playlist`);
    }
  }, [data, setTitle]);

  if (status === "loading" || status === "error") return null;
  return <PlaylistDetail detail={data} />;
}

export default PlaylistMobile;
