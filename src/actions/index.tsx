export const handleParameter = (query:String) => {
  return {
    type: "HANDLE_QUERY",
    payload: query
  }
}
// example: https://images-api.nasa.gov/search?q=nebula