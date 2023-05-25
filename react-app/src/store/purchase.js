const POST_PURCHASE = "PURCHASES/POST_REVIEW";
const EDIT_PURCHASE= "PURCHASES/EDIT_REVIEW";
const GET_PURCHASE = "PURCHASES/GET_REVIEW";
const DELETE_PURCHASE = "PURCHASES/DELETE_REVIEW"

const postPurchase = (purchase) => ({
  type: POST_PURCHASE,
  payload: purchase,
});

const editPurchase = (purchase) => ({
  type: EDIT_PURCHASE,
  payload: purchase
});

const getPurchases = (purchases) => ({
  type: GET_PURCHASE,
  payload: purchases,
});

const deletePurchase = (id) => ({
  type: DELETE_PURCHASE,
  payload: id
});

export const fetchAllPurchase = () => async (dispatch) => {
  const {name, date_of_purchase} = purchase
  const response = await fetch("/api/purchases");
  if (response.ok) {
    const reviews = await response.json();
    dispatch(getReviews(reviews));
    return reviews;
  }
};

export const fetchPostPurchase = (purchase) => async (dispatch) => {
  const response = await fetch("/api/purchases", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(purchase),
  });
  if (response.ok) {
    const purchase = await response.json();
    dispatch(postPurchase(purchase));
    return response;
  }
};

export const fetchEditPurchase = (purchaseId, payload) => async (dispatch) => {
  console.log(purchaseId)
  const res = await fetch(`/api/purchases/${purchaseId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  if (res.ok) {
    const data = await res.json()
    dispatch(editPurchase(data))
    return data
  }
}

export const fetchDeletePurchase = (id) => async (dispatch) => {
  const response = await fetch(`/api/purchases/${id}`, {
    method: "DELETE",
  });
  console.log(response)
  if (response.ok) {
    dispatch(deletePurchase(id))
    return response
  }
}

const initialState = {};

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_PURCHASE:
      newState = action.payload;
      return newState;
    case POST_PURCHASE:
      newState = Object.assign({}, state);
      newState[action.payload.id] = action.payload;
      return newState;
    case EDIT_PURCHASE:
      newState = Object.assign({}, state);
      newState[action.payload.id] = action.payload;
      return newState;
    case DELETE_PURCHASE:
      newState = Object.assign({}, state);
      delete newState[action.payload.id];
      return newState;
    default:
      return state;
  }
}