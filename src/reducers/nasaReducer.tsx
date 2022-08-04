/* eslint-disable import/no-anonymous-default-export */
import {
  HANDLE_QUERY,
  HANDLE_MEDIA_TYPE,
  HANDLE_RESPONSE_LINK
} from '../actions/types';

export default (state = {}, action:any) => {
  switch (action.type) {
    case HANDLE_QUERY:
      return {...state, query: action.payload};
    case HANDLE_MEDIA_TYPE:
    return {...state, mediaType: action.payload};
    case HANDLE_RESPONSE_LINK:
    return {...state, responseLink: action.payload};
    default:
      return state;
  }
}