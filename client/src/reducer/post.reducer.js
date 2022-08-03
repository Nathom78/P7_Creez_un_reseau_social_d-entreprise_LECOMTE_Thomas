import { ADD_POST, DELETE_COMMENT, GET_POSTS } from "../actions/post.action";
import { LIKE_POST } from "../actions/post.action";
import { UNLIKE_POST } from "../actions/post.action";
import { UPDATE_POST } from "../actions/post.action";
import { DELETE_POST } from "../actions/post.action";
import { ADD_COMMENT } from "../actions/post.action";

const initialState = {};

export default function postReducer(state = initialState, action) {
  switch (action.type) {

    case UPDATE_POST:
    return state.map((post) => {
      if (post._id === action.payload.postId) {
        const urlImage = !action.payload.response ? post.imageUrl : action.payload.response
        
        return {
          ...post,
          message: action.payload.message,
          imageUrl: urlImage,
        };
      }
      return post;
    });

    case ADD_POST:       
    return action.payload;    
    
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

      
    case ADD_COMMENT:
      {
        const lastComments = action.payload.comments[(action.payload.comments.length -1)];
        const postToModified = state.find(post => post._id === action.payload._id) 
        return {
        ...postToModified,
        comments: [...postToModified.comments, lastComments]
        }  
      } 

    case DELETE_COMMENT: {
      
      const postToModified = state.find(post => post._id === action.payload.postId)       
      return {
        ...postToModified,
        comments: postToModified.comments.filter(
        (comment) => comment._id !== action.payload.commentId
      )};                
    };   

    case DELETE_POST:
    return state.filter((post) => post._id !== action.payload);

    default:
    return state;
  }
}
