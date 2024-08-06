import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest } from "../requestMethods";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// Initialize react-toastify
toast.configure();
export const login = async (dispatch, user) => {
    console.log(user)
  dispatch(loginStart());
  try { 
    const res = await publicRequest.post("/auth/login", user);
    console.log(res.data);
    localStorage.setItem("userId", res.data._id);
    localStorage.setItem(`cart_${res.data._id}`, JSON.stringify(res.data.cart));
    dispatch(loginSuccess(res.data));
    toast.success("Login successful!");
  } catch (err) {
    dispatch(loginFailure());
    toast.error(err);
  }
};