import { addDoc, collection } from "firebase/firestore";
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
