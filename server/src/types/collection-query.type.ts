export interface ICollectionQuery {
  search?: string;
  album?: string;
  genre?: string;
  artist?: string;
}


export interface IMongooseQuery {
    [key: string]: string | object; 
  }