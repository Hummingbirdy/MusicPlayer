import * as React from 'react';
import {
    initializeIcons,
    CommandBar,
    loadTheme,
    PrimaryButton
} from 'office-ui-fabric-react';
//import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import Home from './Main/Home.jsx';
import Library from './Library/Library.jsx';
import Import from './Import/Import.jsx';
import Splash from './Main/Splash.jsx';
import Callback from './Account/Callback.jsx';
import Profile from './Account/Profile.jsx';
import Nav from './Nav.jsx';
import Auth from './Account/Auth.jsx';
import { Fragment } from 'react';
import PrivateRoute from './Account/PrivateRoute.jsx';

initializeIcons();

loadTheme({
    palette: {
        themePrimary: '#3fb0ac',
        themeLighterAlt: '#030707',
        themeLighter: '#0a1c1c',
        themeLight: '#133534',
        themeTertiary: '#266a67',
        themeSecondary: '#389b98',
        themeDarkAlt: '#4eb8b4',
        themeDark: '#64c3c0',
        themeDarker: '#87d3d0',
        neutralLighterAlt: '#151516',
        neutralLighter: '#151516',
        neutralLight: '#141415',
        neutralQuaternaryAlt: '#131314',
        neutralQuaternary: '#121213',
        neutralTertiaryAlt: '#111112',
        neutralTertiary: '#e7e9e1',
        neutralSecondary: '#ebece6',
        neutralPrimaryAlt: '#eff0eb',
        neutralPrimary: '#dddfd4',
        neutralDark: '#f7f7f5',
        black: '#fbfbfa',
        white: '#151516',
    }
});

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.auth = new Auth(this.props.history);
    }

    render() {
        return (
            <Fragment>
                <Nav auth={this.auth}  />
                <hr />
                <hr />
                <div className="container">
                    <Switch>
                        <Route exact path='/' render={props => this.auth.isAuthenticated() ? <Home auth={this.auth} /> : <Splash auth={this.auth}  {...props} />} />
                        <PrivateRoute path='/library' component={Library} auth={this.auth} />
                        <PrivateRoute path='/sync' component={Import} auth={this.auth} />
                        <Route path='/callback' render={props => <Callback auth={this.auth} {...props} />} />
                        <PrivateRoute path='/profile' component={Profile} auth={this.auth} />
                    </Switch>
                </div>
            </Fragment>
        );
    }
}