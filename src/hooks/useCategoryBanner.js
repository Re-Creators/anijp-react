import { useQuery } from "react-query";
import { client } from "../sanityClient";
import { getCategoryBanner } from "../query/categoryQuery";

export default function useCategoryBanner() {
  return useQuery(
    "categoryBanner",
    async () => {
      const data = await client.fetch(getCategoryBanner);

      return data[0];
    },
    {
      staleTime: Infinity,
    }
  );
}
