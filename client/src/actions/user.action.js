import axios from "axios";

export const GET_USER = "GET_USER";
export const UPDATE_BIO = "UPDATE_BIO";
export const UPLOAD_AVATAR = "UPLOAD_AVATAR";

const apiUrl = "http://localhost:3000/api/user";
const authAxios = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
  },
});

export const getUser = (uid) => {
  return (dispatch) => {
    authAxios
      .get(`http://localhost:3000/api/user/${uid}`)
      .then((res) => {
        dispatch({
          type: GET_USER,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const updateBio = (userId, bio) => {
  return (dispatch) => {
    authAxios
      .put(`http://localhost:3000/api/user/${userId}`, { bio })
      .then((res) => {
        dispatch({
          type: UPDATE_BIO,
          payload: { bio },
        });
      })
      .catch((err) => console.log(err));
  };
};

export const uploadAvatar = (data, userId) => {
  return (dispatch) => {
    authAxios
      .post(`http://localhost:3000/api/user/avatar`, data)
      .then((res) => {
        authAxios
          .get(`http://localhost:3000/api/user/${userId}`)
          .then((res) => {
            dispatch({
              type: UPLOAD_AVATAR,
              payload: res.data.avatar,
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
};
