/* eslint-disable import/no-anonymous-default-export */
import {
  HANDLE_QUERY,
  HANDLE_MEDIA_TYPE,
  HANDLE_COLLECTION_LINK,
  HANDLE_COLLECTION_INFO  
} from '../actions/types';

export default (state = { query: "supernova", mediaType: "image" }, action:any) => {
  switch (action.type) {
    case HANDLE_QUERY:
      return {...state, query: action.payload};
    case HANDLE_MEDIA_TYPE:
      return {...state, mediaType: action.payload};
    case HANDLE_COLLECTION_INFO:
      return {...state, collectionInfo: action.payload};
    case HANDLE_COLLECTION_LINK:
      return {...state, collectionLink: action.payload};
    default:
      return state;
  }
}