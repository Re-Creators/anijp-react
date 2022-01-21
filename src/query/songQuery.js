export const getFavoriteSongs = `*[_type == 'song' && _id in $listId] {
    _id,
    artist,
    title,
    "image" : image.asset->url,
    "songUrl" : song.asset->url,
    duration,
    likes
}
`;
