const POST_REVIEW = "REVIEWS/POST_REVIEW";
const EDIT_REVIEW = "REVIEWS/EDIT_REVIEW";
const GET_REVIEW = "REVIEWS/GET_REVIEW";
const DELETE_REVIEW = "REVIEWS/DELETE_REVIEW"

const postReview = (review) => ({
  type: POST_REVIEW,
  payload: review,
});

const editReview = (review) => ({
  type: EDIT_REVIEW,
  payload: review
});

const getReviews = (reviews) => ({
  type: GET_REVIEW,
  payload: reviews,
});

const deleteReview = (id) => ({
  type: DELETE_REVIEW,
  payload: id
});

export const fetchAllReviews = () => async (dispatch) => {
  const response = await fetch("/api/reviews");
  if (response.ok) {
    const reviews = await response.json();
    dispatch(getReviews(reviews));
    return reviews;
  }
};

export const fetchPostReview = (review) => async (dispatch) => {
  const { caption, url } = review;
  const response = await fetch("/api/reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });
  if (response.ok) {
    const review = await response.json();
    dispatch(postReview(review));
    return response;
  }
};

export const fetchEditReview = (reviewId, payload) => async (dispatch) => {
  console.log(reviewId)
  const res = await fetch(`/api/reviews/${reviewId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  if (res.ok) {
    const data = await res.json()
    dispatch(editReview(data))
    return data
  }
}

export const fetchDeleteReview = (id) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${id}`, {
    method: "DELETE",
  });
  console.log(response)
  if (response.ok) {
    dispatch(deleteReview(id))
    return response
  }
}

const initialState = {};

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_REVIEW:
      newState = action.payload;
      return newState;
    case POST_REVIEW:
      newState = Object.assign({}, state);
      newState[action.payload.id] = action.payload;
      return newState;
    case EDIT_REVIEW:
      newState = Object.assign({}, state);
      newState[action.payload.id] = action.payload;
      return newState;
    case DELETE_REVIEW:
      newState = Object.assign({}, state);
      delete newState[action.payload.id];
      return newState;
    default:
      return state;
  }
}
