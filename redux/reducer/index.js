import { combineReducers } from 'redux';
import LoginReducers from './LoginReducers';
import UsersReducers from './UsersReducers';
import ProductReducers from './ProductReducers';

export default combineReducers({
    Login: LoginReducers,
    Users: UsersReducers,
    Product: ProductReducers,
})