export const nasaReducer = (state = {}, action:any) => {
  if (action.type === "FETCH_CONTENT") {
    return {...state, nasaContent: action.payload};
  }
    return state;
}