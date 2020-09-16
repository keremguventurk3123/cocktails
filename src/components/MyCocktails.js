import React from 'react';
import { connect } from 'react-redux';
import { addCocktailToFavorites, fetchFavoriteCocktails, deleteFavoriteCocktail, fetchCocktail } from '../actions';
import "../styles/CocktailsList.css";


class MyCocktails extends React.Component {

    state = {
        index: 0,
        toRemove: [],
        loaded: false,
        found: false
    }

    componentWillUnmount() {
        for (var cocktailId of this.state.toRemove) {
            this.props.deleteFavoriteCocktail(cocktailId)
        }
        this.setState({
            loaded: false,
            cocktail: null
        })
    }

    onAddFavorite = () => {
        let newToRemove = this.state.toRemove.filter((cocktailId) => {
            return cocktailId !== this.props.favorites[this.state.index].id
        })
        this.setState({ toRemove: newToRemove })
    }

    onRemoveFavorite = () => {
        this.setState({ 
            toRemove: [...this.state.toRemove, this.props.favorites[this.state.index].id],
        })
    }

    onPrevious = () => {
        if (this.state.index > 0) {
            this.props.fetchCocktail(this.props.favorites[this.state.index-1].cocktailId)
                .then(() => {
                    this.setState({
                        index: this.state.index - 1
                    })
                })   
        }
    }

    onNext = () => {
        if (this.state.index < this.props.favorites.length - 1) {
            this.props.fetchCocktail(this.props.favorites[this.state.index+1].cocktailId)
                .then(() => {
                    this.setState({
                        index: this.state.index + 1
                    })
                })
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

    renderPreviousButton() {
        if (this.state.index > 0) {
            return <button className="ui blue button" onClick={this.onPrevious}>Previous</button>
        } else {
            return <button className="ui grey button disabled">Previous</button>
        }
    }

    renderNextButton() {
        if (this.state.index < this.props.favorites.length - 1) {
            return <button className="ui blue button" onClick={this.onNext}>Next</button>
        } else {
            return <button className="ui grey button disabled">Next</button>
        }
    }

    renderFavoriteButton() {
        if (this.state.toRemove.find((cocktailId) => {
            return cocktailId === this.state.index + 1
        })) {
            return (
                <button className="ui green button" onClick={this.onAddFavorite}>Add To Favorites</button>
            )
        }
        return (
            <button className="ui red button" onClick={this.onRemoveFavorite}>Remove From Favorites</button>
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
                        {this.renderPreviousButton()}
                        {this.renderFavoriteButton()}
                        {this.renderNextButton()}
                    </div>
                </div>
            </div>
        )
    }

    loadContent() {
        this.props.fetchFavoriteCocktails(this.props.currentUserId)
            .then(() => {
                if (this.props.favorites.length) {
                    this.props.fetchCocktail(this.props.favorites[this.state.index].cocktailId)
                    .then(() => {
                        this.setState({ 
                            loaded: true,
                            found: true
                        })
                    })
                } else {
                    this.setState({ loaded: true })
                }
            })
    }

    render() {
        if (!this.props.isSignedIn) {
            return <div> Please sign in to view your favorite cocktails</div>
        }

        if (!this.props.currentUserId) {
            return <div> Loading </div>
        }

        if (this.props.currentUserId && !this.state.loaded) {
            this.loadContent()
        }

        if (!this.state.found) {
            return <div> You haven't selected any favorite cocktails :( </div>
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
        cocktail: state.cocktails.cocktail,
        favorites: state.cocktails.favorites,
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn,
    }
}

export default connect(mapStateToProps, { addCocktailToFavorites, fetchFavoriteCocktails, deleteFavoriteCocktail, fetchCocktail })(MyCocktails);