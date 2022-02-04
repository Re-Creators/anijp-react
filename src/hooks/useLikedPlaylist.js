import { useQuery } from "react-query";
import { getLikedPlaylist } from "../query/playlistQuery";
import { client } from "../sanityClient";

const fetchLikedPlaylist = async (likedPlaylistIds) => {
  const query = getLikedPlaylist;
  const data = await client.fetch(query, { listId: likedPlaylistIds });

  return data;
};

export default function useLikedPlaylist(likedPlaylistIds, user) {
  return useQuery("likedPlaylist", () => fetchLikedPlaylist(likedPlaylistIds), {
    initialData: [],
    enabled: !!user,
    refetchOnWindowFocus: false,
  });
}
