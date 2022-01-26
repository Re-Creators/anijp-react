import { useQuery } from "react-query";
import { getAllPlaylist } from "../query/playlistQuery";
import { client } from "../sanityClient";

export default function useCategoryPlaylist() {
  return useQuery(
    "categories",
    async () => {
      const data = await client.fetch(getAllPlaylist);

      return data;
    },
    {
      staleTime: Infinity,
    }
  );
}
