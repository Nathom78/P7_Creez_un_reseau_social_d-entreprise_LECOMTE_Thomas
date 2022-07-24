import { GET_USER } from "../actions/user.action";
// import { UPLOAD_PROFIL } from "../actions/user.action";
import { UPDATE_BIO } from "../actions/user.action";
import { UPLOAD_AVATAR } from "../actions/user.action";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;
   
      case UPDATE_BIO:
      return {
        ...state,
        bio: action.payload,
      };

    case UPLOAD_AVATAR:
      return { ...state, avatar: action.payload };
    default:
      return state;
  }
}
