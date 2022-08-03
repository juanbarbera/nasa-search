// export const nasaReducer = (state = {}, action:any) => {
//   if (action.type === "HANDLE_PARAMETER") {
//     return {...state, query: action.payload};
//   } else {
//     return state;
//   }
// }

export default (state = {}, action:any) => {
  switch (action.type) {
    case "HANDLE_QUERY":
      return {...state, query: action.payload};
    default:
      return state;
  }
}