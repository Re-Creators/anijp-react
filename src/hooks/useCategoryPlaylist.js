import { useQuery } from "react-query";
import { client } from "../sanityClient";
import getCategories from "../query/categoryQuery";

export default function useCategoryPlaylist() {
  return useQuery(
    "categories",
    async () => {
      const data = await client.fetch(getCategories);

      return data;
    },
    {
      staleTime: Infinity,
    }
  );
}
