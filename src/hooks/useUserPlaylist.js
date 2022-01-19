import { useCallback, useEffect, useState } from "react";
import { db } from "../firebase-config";
import { collection, getDocs, where, query } from "firebase/firestore";

export function useUserPlaylist(user) {
  const [userPlaylist, setUserPlaylist] = useState([]);

  const fetchData = useCallback(async () => {
    if (user) {
      const playlistRef = collection(db, "user_playlists");
      const q = query(playlistRef, where("user_id", "==", user.uid));

      try {
        const { docs } = await getDocs(q);
        let playlist = [];

        docs.forEach((doc) => {
          const data = {
            id: doc.id,
            name: doc.data().name,
            user_id: doc.data().user_id,
            songs: doc.data().songs,
            cover: doc.data().cover,
            coverPathStorage: doc.data().coverPathStorage,
          };
          playlist.push(data);
        });
        setUserPlaylist(playlist);
        return;
      } catch (err) {
        console.log("err");
      }
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { userPlaylist, fetchData };
}
