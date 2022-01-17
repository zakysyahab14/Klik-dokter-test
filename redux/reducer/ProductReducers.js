import { GET_PRODUCT, ADD_PRODUCT, EDIT_PRODUCT, DELETE_PRODUCT, SEARCH_PRODUCT } from "./Types"

const initialState ={
    product: [],
    loading: true
}

export default function ProductReducers(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCT:
            return {
                ...state,
                product: action.payload,
                loading: false
            }
        case SEARCH_PRODUCT:
            return {
                ...state,
                product: action.payload,
                loading: false
            }
        case ADD_PRODUCT:
            return {
                ...state,
                loading: false
            }
        case EDIT_PRODUCT:
            return {
                ...state,
                loading: false
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                loading: false
            }
        default:
        return state;
    }
}