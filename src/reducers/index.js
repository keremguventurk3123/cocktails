import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AuthReducer from './AuthReducer';
import CocktailReducer from './CocktailReducer';

export default combineReducers({
    auth: AuthReducer,
    form: formReducer,
    cocktails: CocktailReducer
});