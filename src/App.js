import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import Header from './components/Header';
import CocktailsList from './components/CocktailsList';
import MyCocktails from './components/MyCocktails';

const App = () => {
    return (
        <div className="ui container">
            <Router history={history}>
                <div>
                    <Header />
                    <Switch>
                        <Route path="/" exact component={CocktailsList} />
                        <Route path="/streams/my_cocktails" exact component={MyCocktails} />
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

export default App;

