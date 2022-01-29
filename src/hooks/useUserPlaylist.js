import { useEffect, useRef, useState } from "react";
import { db, storage } from "../firebase-config";
import { getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { deleteObject, ref } from "firebase/storage";

export function useUserPlaylist(id, successDelete) {
  const [data, setData] = useState(null);

  const docRef = useRef(null);

  const onDeleteSong = async (songIndex) => {
    const newSongs = data.songs.filter((el, index) => index !== songIndex);
    try {
      await updateDoc(docRef.current, { songs: newSongs }, { merge: true });
      setData({ ...data, songs: newSongs });
      toast.success("Song successfully deleted");
    } catch (err) {
      console.log(err);
    }
  };

  const deletePlaylist = async () => {
    try {
      const toastLoading = toast.loading("Deleting playlist");
      await deleteDoc(doc(db, "user_playlists", id));
      if (data.coverPathStorage !== "") {
        const docRef = ref(storage, data.coverPathStorage);

        await deleteObject(docRef);
      }

      successDelete();
      toast.update(toastLoading, {
        render: "Playlist deleted!",
        type: "success",
        isLoading: false,
        autoClose: 4000,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        docRef.current = doc(db, "user_playlists", id);
        const docSnap = await getDoc(docRef.current);
        if (docSnap.exists()) {
          setData(docSnap.data());
        }
      } catch (err) {
        console.error(err);
      }
      return;
    };

    fetchData();
  }, [id]);

  return { data, onDeleteSong, deletePlaylist };
}
