const getCategories = `*[_type == 'category'] | order(_createdAt desc)
 {
     _id,
    name,
    playlist[]-> {
        _id,
        name,
        description,
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
   }
 }
`;

export default getCategories;
