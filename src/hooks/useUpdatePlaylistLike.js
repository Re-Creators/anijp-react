import { useMutation, useQueryClient } from "react-query";
import { client } from "../sanityClient";

const updateLike = async (playlist) => {
  let response = playlist.isLiked
    ? await client.patch(playlist.id).dec({ likes: 1 }).commit()
    : await client.patch(playlist.id).inc({ likes: 1 }).commit();
  return response;
};

export default function useUpdatePlaylistLike() {
  const queryClient = useQueryClient();
  return useMutation(updateLike, {
    onSuccess: async (data, variables) => {
      await queryClient.invalidateQueries("likedPlaylist", {
        exact: true,
        refetchActive: false,
      });
      const previousData = queryClient.getQueryData(["playlist", variables.id]);
      queryClient.setQueriesData(["playlist", variables.id], {
        ...previousData,
        likes: data.likes,
      });
    },
  });
}
