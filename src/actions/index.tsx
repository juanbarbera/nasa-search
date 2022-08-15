import {
  HANDLE_QUERY,
  HANDLE_MEDIA_TYPE,
  HANDLE_COLLECTION_LINK,
  HANDLE_COLLECTION_INFO
} from './types';

export const handleQuery = (query:String) => {
  return {
    type: HANDLE_QUERY,
    payload: query
  }
}
export const handleMediaType = (mediaType:String) => {
  return {
    type: HANDLE_MEDIA_TYPE,
    payload: mediaType
  }
}
export const handleCollectionInfo = (collectionInfo:String) => {
  return {
    type: HANDLE_COLLECTION_INFO,
    payload: collectionInfo
  }
}
export const handleCollectionLink = (collectionLink:String) => {
  return {
    type: HANDLE_COLLECTION_LINK,
    payload: collectionLink
  }
}
// example: https://images-api.nasa.gov/search?q=nebula