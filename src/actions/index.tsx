import {
  HANDLE_QUERY,
  HANDLE_MEDIA_TYPE,
  HANDLE_RESPONSE_LINK
} from './types';

export const handleParameter = (query:String) => {
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

export const handleResponseLink = (responseLink:String) => {
  return {
    type: HANDLE_RESPONSE_LINK,
    payload: responseLink
  }
}

// example: https://images-api.nasa.gov/search?q=nebula