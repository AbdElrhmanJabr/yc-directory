import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY =
  defineQuery(`*[_type == "startup" && defined(slug.current) && !defined($search) || author->name match $search || category match $search || title match $search ] | order(_createdAt desc){
    slug , 
    title , 
    _id , 
    _createdAt,
  pitch , 
    category,
    views , 
    image , 
    author -> {
      name , 
      id,
      username , 
      image , 
      bio, 
      email
    },
    description
}
`);

export const STARTUP_BY_ID_QUERY =
  defineQuery(`*[_type == "startup" && _id == $id][0]{
    slug , 
    title , 
    _id , 
    _createdAt,
  pitch , 
    category,
    views , 
    image , 
    author -> {
      name , 
      id,
      username , 
      image , 
      bio, 
      email
    },
    description
}`);
export const STARTUP_VIEWS_QUERY =
  defineQuery(`*[_type == "startup" && _id == $id][0]{
  _id , views
  }`);

  export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(`
    *[_type == "author" && id == $id][0]{
        _id, 
        id,
        name, 
        username, 
        email,
        image,
        bio
    }
`);

  export const AUTHOR_BY_ID_QUERY = defineQuery(`
    *[_type == "author" && _id == $id][0]{
        _id, 
        id,
        name, 
        username, 
        email,
        image,
        bio
    }
`);
export const STARTUPS_BY_AUTHOR_QUERY =
  defineQuery(`*[_type == "startup" && author._ref == $id ]| order(_createdAt desc){
    slug , 
    title , 
    _id , 
    _createdAt,
  pitch , 
    category,
    views , 
    image , 
    author -> {
      name , 
      id,
      username , 
      image , 
      bio, 
      email
    },
    description
}
`);
export const PLAYLIST_BY_SLUG_QUERY =
  defineQuery(`*[_type == "playlist" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  select[]->{
    _id,
    _createdAt,
    title,
    slug,
    author->{
      _id,
      name,
      slug,
      image,
      bio
    },
    views,
    description,
    category,
    image,
    pitch
  }
}`);