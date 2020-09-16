import React from 'react';
import { connect } from 'react-redux';
import { fetchRandomCocktail, addCocktailToFavorites, fetchFavoriteCocktails, deleteFavoriteCocktail } from '../actions';
import "../styles/CocktailsList.css";


class CocktailsList extends React.Component {
    state = {
        loaded: false
    }

    componentDidMount() {
        this.props.fetchRandomCocktail();
        this.props.fetchFavoriteCocktails(this.props.currentUserId);
    }

    onAddFavorite = () => {
        if (this.props.isSignedIn) {
            this.props.addCocktailToFavorites(this.props.cocktail.id);
        }
    }

    onRemoveFavorite = () => {
        const favoriteToDelete = this.props.favorites.find((cocktail) => {
            return cocktail.cocktailId === this.props.cocktail.id
        })
        if (this.props.isSignedIn) {
            this.props.deleteFavoriteCocktail(favoriteToDelete.id)
        }
    }

    renderIngredients(ingredients) {
        return ingredients.map((ingredient) => {
            return (
                <div key={ingredient}>
                    - {ingredient}
                    <br />
                </div>
            )
        })
    }

    renderSteps(steps) {
        const result = []
        for (var i = 0; i < steps.length; i++) {
            result.push(
                <div key={i}>
                    {i + 1}) {steps[i]}
                    <br />
                </div>
            )
        }
        return result;
    }

    renderFavoriteButton() {
        if (!this.props.isSignedIn) {
            return <button className="ui grey button disabled">Sign In To Add To Favorites</button>
        }


        if (this.props.favorites.find((cocktail) => {
            return cocktail.cocktailId === this.props.cocktail.id && cocktail.userId === this.props.currentUserId
        })) {
            return (
                <button className="ui green button" onClick={this.onRemoveFavorite}>Remove From Favorites</button>
            )
        }
        return (
            <button className="ui grey button" onClick={this.onAddFavorite}>Add To Favorites</button>
        )
    }

    renderCocktail() {
        const cocktail = this.props.cocktail
        return (
            <div className="cocktailsContainer">
                <img src={cocktail.image} className="cocktailImage" />
                <div>
                    <div className="cocktailDescriptionContainer">
                        <div className="cocktailTitle"> {cocktail.title} </div>
                        <div className="descriptionTitle">
                            Description
                        </div>
                        <div className="descriptionContent">
                            {cocktail.description}
                        </div>
                        <div className="descriptionTitle">
                            Ingredients
                        </div>
                        <div className="descriptionContent">
                            {this.renderIngredients(cocktail.ingredients)}
                        </div>
                        <div className="descriptionTitle">
                            Steps
                        </div>
                        <div className="descriptionContent">
                            {this.renderSteps(cocktail.steps)}
                        </div>
                    </div>
                    <div className="cocktailButtonContainer">
                        <button className="ui red button" onClick={this.props.fetchRandomCocktail} >Get New Random Cocktail</button>
                        {this.renderFavoriteButton()}
                    </div>
                </div>
            </div>
        )
    }

    loadContent() {
        this.props.fetchFavoriteCocktails(this.props.currentUserId)
            .then(() => {
                this.setState({ loaded: true })
            })
    }

    render() {
        if (!this.props.currentUserId) {
            return <div> Please sign in to view cocktails </div>
        }

        if (this.props.currentUserId && !this.state.loaded) {
            this.loadContent()
        }

        if (!this.props.cocktail) {
            return <div> Loading </div>
        }

        return (
            <div>
                {this.renderCocktail()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        favorites: state.cocktails.favorites,
        cocktail: state.cocktails.cocktail,
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn,
        fetched: state.cocktails.fetched
    }
}

export default connect(mapStateToProps, { fetchRandomCocktail, addCocktailToFavorites, fetchFavoriteCocktails, deleteFavoriteCocktail })(CocktailsList);