export const getAllPlaylist = `*[_type == 'playlist']
{
  _id,
  name,
  "cover" : image.asset->url,
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
