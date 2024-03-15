import { ICollectionQuery, IMongooseQuery } from "types/collection-query.type.js";


export function getCollectionQuery(query?: ICollectionQuery)  {

    let collectionQuery: IMongooseQuery = {};
  
    if (query?.search) {
      collectionQuery["title"] = { $regex: query.search, $options: "i" };
    }
  
    if (query?.album) {
      collectionQuery["album"] = query.album;
    }
  
    if (query?.genre) {
      collectionQuery["genre"] = query.genre;
    }
  
    if (query?.artist) {
      collectionQuery["artist"] = query.artist;
    }
  
    return collectionQuery;
  }