import axios from "axios";
export const GET_POSTS = "GET_POSTS";
export const ADD_POST = "ADD_POST";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";
export const RESET_POSTS = "RESET_POSTS";

export const ADD_COMMENT = "ADD_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";



const apiUrl = "http://localhost:3000/api/post";
const authAxios = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,    
  },
});

// Postes

export const getPosts = (userId) => {
  
  return (dispatch) => {
    
    authAxios
      .get(`${apiUrl}`, {userId : userId})
      .then((res) => {
        dispatch({
          type: GET_POSTS,
          payload: res.data,
        });        
      })
      .catch((err) => console.log(err));
  };
};

export const addPost = (userId, message, file ) => { 
  const data = new FormData();
  data.append("posterId", userId);
  data.append("message", message);
  data.append("userId", userId);
  if (file) data.append("file", file);

  return (dispatch) => {    
    authAxios
      .post(`${apiUrl}/`, data)
      .then((res) => {
          dispatch({            
          type: ADD_POST,
          payload: res.data,
          
          });        
      })
      .catch((err) => console.log(err));
  };
};


export const updatePost = (postId, message, file ) => {
  
  return (dispatch) => {
    const data = new FormData();    
    data.append("message", message);    
    if (file) data.append("file", file);
    

    authAxios      
      .put(`${apiUrl}/${postId}`, data )
      .then((res) => {        
        const response = res.data;
        dispatch({
          type: UPDATE_POST,
          payload: { postId, message, response },
        });
      })
      .catch((err) => console.log(err));
  };
};

export const deletePost = (postId) => {
  return (dispatch) => {
    authAxios
      .delete(`${apiUrl}/${postId}`)
      .then((res) => {
        dispatch({
          type: DELETE_POST,
          payload: postId,
        });
      })
      .catch((err) => console.log(err));
  };
};

// Likes

export const likePost = (postId, userId) => {
  return (dispatch) => {
    authAxios
      .put(`${apiUrl}/like-post/${postId}`, { userId, like: 1 })
      .then(() => {
        dispatch({
          type: LIKE_POST,
          payload: { postId, userId },
        });
      })
      .catch((err) => console.log(err));
  };
};

export const unlikePost = (postId, userId) => {
  return (dispatch) => {
    authAxios
      .put(`${apiUrl}/unlike-post/${postId}`, { userId, like: 0 })
      .then(() => {
        dispatch({
          type: UNLIKE_POST,
          payload: { postId, userId },
        });
      })
      .catch((err) => console.log(err));
  };
};

// Comments

export const addComment = (postId, commenterId, text, commenterName) => {
  return (dispatch) => {
    authAxios
      .put(`${apiUrl}/comment-post/${postId}`, {
        commenterId,
        text,
        commenterName,
      })
      .then((res) => {
        dispatch({
        type: ADD_COMMENT,
        payload: res.data, 
        });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteComments = (postId, commentId) => {
  return (dispatch) => {
    authAxios({
      method: "delete",
      url: `${apiUrl}/delete-comment/${postId}/`,
      data: {
        commentId: commentId,
      },
    })
      .then(() => {        
        dispatch({
          type: DELETE_COMMENT,
          payload: { postId, commentId },
          });
      })
      .catch((err) => console.log(err));
  };
};
