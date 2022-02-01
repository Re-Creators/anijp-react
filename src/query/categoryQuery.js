export const getCategories = `*[_type == 'category' && name != 'Featured Banner'] | order(_createdAt desc)
 {
     _id,
    name,
    playlist[]-> {
        _id,
        name,
        description,
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
   }
 }
`;

export const getCategoryBanner = `*[_type == 'category' && name == 'Featured Banner']
{
   name,
   playlist[]-> {
       _id,
       name,
       description,
       "cover" : cover.asset->url,
       "banner" : banner.asset->url,
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
}`;
