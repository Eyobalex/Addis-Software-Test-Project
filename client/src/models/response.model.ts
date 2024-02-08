export interface Response<T> {
    message?: string;
    data?: T;
}


export interface CollectionResponse<T> {
    message?: string;
    data?: T[];
}