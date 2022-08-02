import axios from 'axios';

export const fetchContent = (parameter:string) => async (dispatch:any) => {
  const response:any = await axios.get(`https://images-api.nasa.gov/search?q=${parameter.toLowerCase()}`)
    .then(() => {
      // const controlledResponse =  response ? response.data.collection.items.slice(0, 6) : [];
      const controlledResponse =  response.data.collection.items.slice(0, 6);
      // console.log(controlledResponse);
    
      dispatch({ type: "FETCH_CONTENT", payload: controlledResponse});
    })
    .catch(error => {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    });
    
  
}
// example: https://images-api.nasa.gov/search?q=nebula