import { combineReducers } from 'redux';
import LoginReducers from './LoginReducers';
import ProductReducers from './ProductReducers';

export default combineReducers({
    Login: LoginReducers,
    Product: ProductReducers,
})