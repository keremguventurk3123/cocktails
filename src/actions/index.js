import cocktails from '../apis/cocktails';

export const signIn = (userId) => {
    return {
        type: "SIGN_IN",
        payload: userId
    };
};

export const signOut = () => {
    return {
        type: "SIGN_OUT"
    };
};

export const fetchRandomCocktail = () => {
    return async (dispatch) => {
        const response = await cocktails.get("./cocktails");
        dispatch({ type: "FETCH_RANDOM_COCKTAIL", payload: rand(response.data) });
    };
};

export const fetchCocktail = (cocktailId) => {
    return async (dispatch) => {
        const response = await cocktails.get(`./cocktails/${cocktailId}`);
        dispatch({ type: "FETCH_COCKTAIL", payload: response.data });
    };
};

function rand(items) {
    // "|" for a kinda "int div"
    return items[items.length * Math.random() | 0];
}

export const addCocktailToFavorites = (cocktailId) => {
    return async (dispatch, getState) => {
        const { userId } = getState().auth;
        const result = await cocktails.post(`./favorites`, { userId, cocktailId });
        dispatch({ type: "ADD_COCKTAIL_FAVORITE", payload: result.data });
    };
}

export const fetchFavoriteCocktails = (userId) => {
    return async (dispatch) => {
        let response = await cocktails.get("./favorites");
        response = response.data.filter((favorite) => {
            return favorite.userId === userId
        })
        dispatch({ type: "FETCH_FAVORITE_COCKTAILS", payload: response })
    }
}

export const deleteFavoriteCocktail = (cocktailId) => {
    return async (dispatch) => {
        await cocktails.delete(`./favorites/${cocktailId}`);
        dispatch({ type: "DELETE_FAVORITE_COCKTAIL", payload: cocktailId });
    }
}