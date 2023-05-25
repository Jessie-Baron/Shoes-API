const GET_DETAILS = "SHOEDETAILS/GET_DETAILS";
const DELETE_DETAILS = "SHOEDETAILS/DELETE_DETAILS"
const EDIT_DETAILS = "SHOEDETAILS/EDIT_DETAILS";



const getShoeDetails = (shoe) => ({
  type: GET_DETAILS,
  payload: shoe,
});

export const deleteShoeDetails = () => ({
  type: DELETE_DETAILS
});

export const editShoeDetails = (shoe) => ({
  type: EDIT_DETAILS,
  payload: shoe
});


export const fetchShoeDetails = (id) => async (dispatch) => {
  const response = await fetch(`/api/shoes/${id}`);
  if (response.ok) {
    const shoe = await response.json();
    dispatch(getShoeDetails(shoe));
    return response;
  }
};

const initialState = {};

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_DETAILS:
      newState = action.payload;
      return newState;
    case DELETE_DETAILS:
        newState = {}
        return newState
    default:
      return state;
  }
}
