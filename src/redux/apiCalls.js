import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest } from "../requestMethods";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
// Initialize react-toastify

export const login = async (dispatch, user) => {
    console.log(user)
  dispatch(loginStart());
  try { 
    const res = await publicRequest.post("/auth/login", user);
    console.log(res.data);
    localStorage.setItem("userId", res.data._id);
    localStorage.setItem(`cart_${res.data._id}`, JSON.stringify(res.data.cart));
    toast.success("Login successful!");
    dispatch(loginSuccess(res.data));
   
  } catch (err) {
    dispatch(loginFailure());
    toast.error(err);
  }
};