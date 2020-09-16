import _ from "lodash";

export default (state = {}, action) => {
    switch (action.type) {
        case "FETCH_COCKTAIL":
            console.log("fetching cocktail")
            return { ...state, cocktail: action.payload }
        case "FETCH_RANDOM_COCKTAIL":
            return { ...state, cocktail: action.payload }
        case "ADD_COCKTAIL_FAVORITE":
            return { ...state, favorites: [...state.favorites, action.payload] }
        case "FETCH_FAVORITE_COCKTAILS":
            return { ...state, favorites: action.payload }
        case "DELETE_FAVORITE_COCKTAIL":
            let oldFavorites = state.favorites || [];
            oldFavorites = oldFavorites.filter((cocktail) => {
                return cocktail.id !== action.payload
            })
            return { ...state, favorites: oldFavorites }
        default:
            return state;
    }
}