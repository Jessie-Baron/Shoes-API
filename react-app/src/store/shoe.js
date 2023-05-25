const POST_SHOE = "shoes/POST_SHOE";
const EDIT_SHOE = "shoes/EDIT_SHOE";
const GET_SHOES = "shoes/GET_SHOES";
const DELETE_SHOE = "shoes/DELETE_SHOE";

const postShoe = (shoe) => ({
  type: POST_SHOE,
  payload: shoe,
});

const editShoe = (shoe) => ({
  type: EDIT_SHOE,
  payload: shoe,
});

const getShoes = (shoes) => ({
  type: GET_SHOES,
  payload: shoes,
});

const deleteShoe = (id) => ({
  type: DELETE_SHOE,
  payload: id,
});

export const fetchAllShoes = () => async (dispatch) => {
  const response = await fetch("/api/shoes");
  if (response.ok) {
    const shoes = await response.json();
    dispatch(getShoes(shoes));
    return shoes;
  }
};

export const fetchPostShoe = (shoe) => async (dispatch) => {
  const { img_url, brand, model, type, size, color, material, price, review_id } = shoe;
  const response = await fetch("/api/shoes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(shoe),
  });
  if (response.ok) {
    const newShoe = await response.json();
    dispatch(postShoe(newShoe));
    return response;
  }
};

export const fetchEditShoe = (shoeId, payload) => async (dispatch) => {
  const res = await fetch(`/api/shoes/${shoeId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  if (res.ok) {
    const updatedShoe = await res.json();
    dispatch(editShoe(updatedShoe));
    return updatedShoe;
  }
};

export const fetchDeleteShoe = (id) => async (dispatch) => {
  const response = await fetch(`/api/shoes/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(deleteShoe(id));
    return response;
  }
};

const initialState = {};

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_SHOES:
      newState = action.payload;
      return newState;
    case POST_SHOE:
      newState = Object.assign({}, state);
      newState[action.payload.id] = action.payload;
      return newState;
    case EDIT_SHOE:
      newState = Object.assign({}, state);
      newState[action.payload.id] = action.payload;
      return newState;
    case DELETE_SHOE:
      newState = Object.assign({}, state);
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
}