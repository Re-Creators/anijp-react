import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import {
  getDownloadURL,
  uploadBytes,
  ref as storageRef,
} from "firebase/storage";
import { db, storage } from "../firebase-config";
import { v4 as uuidv4 } from "uuid";

export async function createNewPlaylist(
  imageFile,
  userId,
  playlistName,
  description
) {
  const docRef = storageRef(storage, "playlistCover/" + uuidv4());

  let coverUrl = "";
  let coverPath = "";

  try {
    if (imageFile) {
      await uploadBytes(docRef, imageFile);
      coverUrl = await getDownloadURL(docRef);
      coverPath = docRef.fullPath;
    }

    return addDoc(collection(db, "user_playlists"), {
      name: playlistName,
      cover: coverUrl,
      coverPathStorage: coverPath,
      songs: [],
      description: description,
      user_id: userId,
    });
  } catch (err) {
    return err;
  }
}

export async function addSongIntoPlaylist(newSong, playlistId) {
  const docRef = doc(db, "user_playlists", playlistId);

  try {
    const doc = await getDoc(docRef);
    const songs = doc.data().songs;

    const songExist = songs.some((oldSong) => newSong._id === oldSong._id);
    songs.push(newSong);

    if (!songExist) {
      return updateDoc(docRef, { songs: songs }, { merge: true });
    }

    return Promise.reject({ message: "Song already in playlist" });
  } catch (err) {
    return err;
  }
}
