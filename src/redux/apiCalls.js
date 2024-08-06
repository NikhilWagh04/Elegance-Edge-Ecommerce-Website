import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest } from "../requestMethods";
import { toast } from 'react-toastify';

export const login = async (dispatch, user) => {
  console.log(user);
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    toast.success("Login successful!");
    console.log(res.data);
    localStorage.setItem("userId", res.data._id);
    localStorage.setItem(`cart_${res.data._id}`, JSON.stringify(res.data.cart));
    dispatch(loginSuccess(res.data));
  } catch (err) {
    toast.error("Login failed. Wrong credentials");
    dispatch(loginFailure());
  }
};
