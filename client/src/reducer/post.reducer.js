import { ADD_POST, GET_POSTS } from "../actions/post.action";
import { LIKE_POST } from "../actions/post.action";
import { UNLIKE_POST } from "../actions/post.action";
import { UPDATE_POST } from "../actions/post.action";
import { DELETE_POST } from "../actions/post.action";

const initialState = {};

export default function postReducer(state = initialState, action) {
  switch (action.type) {

    case ADD_POST:
    case UPDATE_POST:     
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

      /*case UPDATE_POST:
      return state.map((post) => {
        console.log("payload "+action.payload);
        console.log("payload.file :" + action.payload.file.name);
        if (post._id === action.payload.postId) {
          console.log(state);          
          return {
            ...post,
            message: action.payload.message,
            imageUrl: "http://localhost:3000/medias/" + action.payload.file.name,        
          };          
        }
        
        return post;
      });*/

    case DELETE_POST:
      return state.filter((post) => post._id !== action.payload);

    default:
      return state;
  }
}
