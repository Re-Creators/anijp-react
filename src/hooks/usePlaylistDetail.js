import { useQuery } from "react-query";
import { getOnePlaylist } from "../query/playlistQuery";
import { client } from "../sanityClient";

const getPlaylistById = async (playlistId) => {
  const query = getOnePlaylist(playlistId);
  const data = await client.fetch(query);

  return data[0];
};

export default function usePlaylistDetail(playlistId) {
  return useQuery(["playlist", playlistId], () => getPlaylistById(playlistId), {
    staleTime: Infinity,
  });
}
