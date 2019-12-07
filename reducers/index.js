import {combineReducers} from 'redux';
import favorites from './favorites';
import home from './home';

export default combineReducers({
    favorites,
    home
})