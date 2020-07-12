import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "./actionTypes";

const initState = {
  isAuth: false,
  loading: false,
  error: "",
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuth: true,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        isAuth: false,
      };
    default:
      return state;
  }
};

export default reducer;
