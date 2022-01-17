import axios from "axios";
import { ERROR, GET_PRODUCT, ADD_PRODUCT, EDIT_PRODUCT, DELETE_PRODUCT, SEARCH_PRODUCT } from "../reducer/Types"
import Cookie from "js-cookie";
import { Modal } from 'antd'

const baseUrl = "https://hoodwink.medkomtek.net/api";
const token = Cookie.get("token")
export const getProduct = () => async (dispatch) => {
    try {
        const res = await axios.get(`${baseUrl}/items`)
        dispatch({
            type: GET_PRODUCT,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: error
        })
    }
}
export const addProduct = (product) => async (dispatch) => {
    try {
        const res = await axios.post(`${baseUrl}/item/add`, product, {
            headers: {
              Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }})
        dispatch({
            type: ADD_PRODUCT,
            payload: product,
        })
        Modal.success({
            content: 'Add Product Success',
          });
          setTimeout(function() {
              window.location.reload()
          }, 1000
          )
    } catch (error) {
        Modal.success({
            content: 'Add Product Failed',
        });
        dispatch({
            type: ERROR,
            payload: error,
        });
    }
}
export const editProduct = (product) => async (dispatch) => {
    try {
        const res = await axios.post(`${baseUrl}/item/update`, product, {
            headers: {
              Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }})
        dispatch({
            type: EDIT_PRODUCT,
            payload: product,
        })
        Modal.success({
            content: 'Update Product Success',
          });
          setTimeout(function() {
              window.location.reload()
          }, 1000
          )
    } catch (error) {
        Modal.success({
            content: 'Update Product Failed',
        });
        dispatch({
            type: ERROR,
            payload: error,
        });
    }
}
export const deleteProduct = (product) => async (dispatch) => {
    try {
        const res = await axios.post(`${baseUrl}/item/delete`, product, {
            headers: {
              Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }})
        dispatch({
            type: DELETE_PRODUCT,
            payload: product.sku,
        })
        Modal.success({
            content: 'Delete Product Success',
          });
          setTimeout(function() {
              window.location.reload()
          }, 1000
          )
    } catch (error) {
        Modal.info({
            content: 'Delete Product Failed',
        });
        dispatch({
            type: ERROR,
            payload: error,
        });
    }
}
export const searchProduct = (product) => async (dispatch) => {
    try {
        const res = await axios.post(`${baseUrl}/item/search`, product)
            console.log(res)
        dispatch({
            type: GET_PRODUCT,
            payload: [res.data],
        });
        if (res.data.data === null) {
            Modal.info({
                content: `${res.data.message}`
            })
        }
        //   setTimeout(function() {
        //       window.location.reload()
        //   }, 1000
        //   )
    } catch (error) {
        Modal.info({
            content: 'SKU product is not valid',
        });
        dispatch({
            type: ERROR,
            payload: error,
        });
    }
}