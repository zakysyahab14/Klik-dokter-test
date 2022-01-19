import { ERROR, USER_LOGIN, USER_LOGOUT, USER_REGISTER } from "../reducer/Types";
import axios from "axios";
import Cookie from "js-cookie";
import { useRouter } from "next/dist/client/router";
import { Modal } from 'antd'


const baseUrl = "https://hoodwink.medkomtek.net/api";

export const userLogin = (user) => async (dispatch) => {
    const router = useRouter();
    try {
        const res = await axios.post(`${baseUrl}/auth/login`, user);
        Cookie.set("token", res.data.token);
        dispatch({
            type: USER_LOGIN,
            payload: res.data
        })
        router.push("/");
        window.location.replace("/")
    } catch(err) {
        Modal.info({
            content: 'Login Failed',
        });
        const errors = err.response.data.errors
        dispatch({
            type: ERROR,
            payload: errors
        })
    }
}
export const userRegister = (user) => async (dispatch) => {
    try {
        const res = await axios.post(`${baseUrl}/register`, user);
        dispatch({
            type: USER_REGISTER,
            payload: res.data
        })
    } catch(err) {
        const errors = err.response.data.errors
        dispatch({
            type: ERROR,
            payload: errors
        })
    }
}

export const userLogout = (user) => async (dispatch) => {
    dispatch({
      type: USER_LOGOUT,
      payload: user,
    });
  };