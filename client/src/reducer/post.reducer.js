import { ADD_POST, GET_POSTS } from "../actions/post.action";
import { LIKE_POST } from "../actions/post.action";
import { UNLIKE_POST } from "../actions/post.action";
import { UPDATE_POST } from "../actions/post.action";
import { DELETE_POST } from "../actions/post.action";

const initialState = {};

export default function postReducer(state = initialState, action) {
  switch (action.type) {

    case ADD_POST:     
    return initialState;    
    
    case GET_POSTS:
      return action.payload;

    case LIKE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            usersLiked: [action.payload.userId, ...post.usersLiked],
          };
        }
        return post;
      });

    case UNLIKE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            usersLiked: post.usersLiked.filter(
              (id) => id !== action.payload.userId
            ),
          };
        }
        return post;
      });

    case UPDATE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          
          return {
            ...post,
            message: action.payload.message,
          };
        }
        
        return post;
      });

    case DELETE_POST:
      return state.filter((post) => post._id !== action.payload);

    default:
      return state;
  }
}
