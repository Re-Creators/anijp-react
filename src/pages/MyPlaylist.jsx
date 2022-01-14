import { useState } from "react";

import Detail from "../components/my-playlist/Detail";
import { MdOutlineMoreHoriz, MdPlaylistAdd, MdDelete } from "react-icons/md";
import MySongList from "../components/my-playlist/MySongList";

const songs = [
  {
    _id: "61896718503d7c91254256a3",
    title: "Kizuna",
    artist: "Aimer",
    likes: 1,
    songUrl:
      "https://res.cloudinary.com/re-creators79/video/upload/v1636394774/anijp/musics/bfi3qdf3mc1en4guoazj.mp4",
    duration: "04:56",
    playlist: "6187aad7d8cc536bef8f847a",
    __v: 0,
  },
  {
    _id: "6189673a503d7c91254256a9",
    title: "Akane Sasu",
    artist: "Aimer",
    likes: 0,
    songUrl:
      "https://res.cloudinary.com/re-creators79/video/upload/v1636394808/anijp/musics/pwyshjw5laji3mlthbpp.mp4",
    duration: "05:40",
    playlist: "6187aad7d8cc536bef8f847a",
    __v: 0,
  },
  {
    _id: "61896759503d7c91254256af",
    title: "Kataomoi",
    artist: "Aimer",
    likes: 0,
    songUrl:
      "https://res.cloudinary.com/re-creators79/video/upload/v1636394840/anijp/musics/crqjizqex45bhvgtaupq.mp4",
    duration: "03:42",
    playlist: "6187aad7d8cc536bef8f847a",
    __v: 0,
  },
  {
    _id: "61896777503d7c91254256b5",
    title: "Ito",
    artist: "Aimer",
    likes: 0,
    songUrl:
      "https://res.cloudinary.com/re-creators79/video/upload/v1636394870/anijp/musics/beiyu3rvigbzeyuvuvqm.mp4",
    duration: "03:43",
    playlist: "6187aad7d8cc536bef8f847a",
    __v: 0,
  },
  {
    _id: "618967a0503d7c91254256bb",
    title: "Choucho Musubi",
    artist: "Aimer",
    likes: 0,
    songUrl:
      "https://res.cloudinary.com/re-creators79/video/upload/v1636394910/anijp/musics/e6bqw3ifjnsjl6mu9juy.mp4",
    duration: "06:05",
    playlist: "6187aad7d8cc536bef8f847a",
    __v: 0,
  },
  {
    _id: "618967c2503d7c91254256c1",
    title: "Daisy",
    artist: "Aimer",
    likes: 0,
    songUrl:
      "https://res.cloudinary.com/re-creators79/video/upload/v1636394944/anijp/musics/t9sh8y2utgmmd6hxameg.mp4",
    duration: "04:22",
    playlist: "6187aad7d8cc536bef8f847a",
    __v: 0,
  },
  {
    _id: "61896a4d503d7c91254256e5",
    title: "March of Time",
    artist: "Aimer",
    likes: 0,
    songUrl:
      "https://res.cloudinary.com/re-creators79/video/upload/v1636395595/anijp/musics/jsov9kfiwtaeiczppldi.mp4",
    duration: "04:56",
    playlist: "6187aad7d8cc536bef8f847a",
    __v: 0,
  },
];

function MyPlaylist() {
  const [showMenu, setShowMenu] = useState(true);
  const [showOption, setShowOption] = useState(false);

  return (
    <div
      className={`text-white ${
        showMenu ? "hide-scrollbar" : "overflow-y-hidden"
      }  h-screen`}
    >
      <Detail />
      <div className="w-full bg-playlist-container md:px-5 lg:px-10 py-5 min-h-screen">
        <div className="flex flex-row items-center mb-10 relative">
          <button>
            <svg
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16"
            >
              <circle cx="40" cy="40" r="25" fill="white" />
              <path
                d="M40 6.66667C21.6 6.66667 6.66669 21.6 6.66669 40C6.66669 58.4 21.6 73.3333 40 73.3333C58.4 73.3333 73.3334 58.4 73.3334 40C73.3334 21.6 58.4 6.66667 40 6.66667ZM33.3334 55V25L53.3334 40L33.3334 55Z"
                fill="#2C62BF"
              />
            </svg>
          </button>
          <button
            className="ml-3 mt-2"
            onClick={() => setShowOption(!showOption)}
          >
            <MdOutlineMoreHoriz className="text-4xl" />
          </button>
          {showOption && (
            <div class="absolute bg-secondary z-50 -top-20 left-28 rounded-lg flex flex-col p-2">
              <div class="px-3 py-2 pr-10 hover:bg-primary-300 rounded-sm flex flex-row items-center cursor-pointer">
                <MdPlaylistAdd class="mr-2 text-xl" />
                <span>Add to queue</span>
              </div>
              <div class="px-3 py-2 pr-10 hover:bg-primary-300 rounded-sm flex flex-row items-center cursor-pointer">
                <MdDelete class="text-lg mr-2" />
                <span>Delete playlist</span>
              </div>
            </div>
          )}
        </div>

        <MySongList songs={songs} />
      </div>
    </div>
  );
}

export default MyPlaylist;
