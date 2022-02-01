export const getOnePlaylist = (id) => `*[_type == 'playlist' && _id == '${id}']
{
  _id,
 name,
  description,
  likes,
 "cover" : cover.asset->url,
 songs[]->{
   _id,
   artist,
   title,
   "image" : image.asset->url,
   "songUrl" : song.asset->url,
   duration,
   likes
   
 }
}`;

export const getLikedPlaylist = `*[_type == 'playlist' && _id in $listId]
{
  _id,
  name,
  "cover" : cover.asset->url,
  songs[]->{
    _id,
    artist,
    title,
    "image" : image.asset->url,
    "songUrl" : song.asset->url,
    duration,
    likes
  }
}`;

export const searchPlaylist = `*[_type == 'playlist' && name match $keyword]
{
  _id,
  name,
  "cover" : cover.asset->url,
  songs[]->{
    _id,
    artist,
    title,
    "image" : image.asset->url,
    "songUrl" : song.asset->url,
    duration,
    likes
  }
}`;
