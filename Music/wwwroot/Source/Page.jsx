import * as React from 'react';
import {
    initializeIcons,
    CommandBar,
    loadTheme,
    PrimaryButton
} from 'office-ui-fabric-react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Main/Home.jsx';
import Library from './Library/Library.jsx';
import Import from './Import/Import.jsx';
import Login from './Account/Login.jsx';
import Signup from './Account/Signup.jsx';
import Splash from './Main/Splash.jsx';

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

export default class Page extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hideLoginDialog: true,
            hideSignupDialog: true,
            signedIn: false,
            userEmail: null
        }
    }

    componentDidMount() {
        this._checkStatus();
    }

    render() {
        let { hideLoginDialog, hideSignupDialog, signedIn, userEmail } = this.state;
        return (
            <Router>
                <div>
                    <CommandBar
                        farItems={[
                            {
                                key: 'login',
                                onRender: () => {
                                    return (
                                        <div>
                                            {
                                                signedIn ?
                                                    <div className="align-centered" >
                                                        <div style={{ fontWeight: 'bold' }}>
                                                            {userEmail}
                                                        </div>
                                                        <PrimaryButton
                                                            onClick={() => this._logout()}
                                                        >
                                                            Logout
                                                        </PrimaryButton>
                                                    </div>
                                                    :
                                                    <div>
                                                        <PrimaryButton
                                                            onClick={() => this._openLoginDialog()}
                                                        >
                                                            Log In
                                                        </PrimaryButton>
                                                        <Login
                                                            hideDialog={hideLoginDialog}
                                                            onDismiss={this._closeLoginDialog}
                                                            switchToSignup={this._openSignupDialog}
                                                        />
                                                        <Signup
                                                            hideDialog={hideSignupDialog}
                                                            onDismiss={this._closeSignupDialog}
                                                            switchToLogin={this._openLoginDialog}
                                                        />
                                                    </div>
                                            }
                                        </div>
                                    )
                                }
                            }
                        ]}
                        items={[
                            {
                                key: 'home',
                                onRender: () => {
                                    return (
                                        <PrimaryButton>
                                            <Link to={'/'}> Home </Link>
                                        </PrimaryButton>
                                    );

                                }
                            }, {
                                key: 'library',
                                name: 'Library',
                                onRender: () => {
                                    return (
                                        <PrimaryButton
                                            disabled={!signedIn}
                                        >
                                            <Link to={'/Library'}> Library </Link>
                                        </PrimaryButton>
                                    );
                                }
                            }, {
                                key: 'sync',
                                name: 'Sync',
                                onRender: () => {
                                    return (
                                        <PrimaryButton
                                            disabled={!signedIn}
                                        >
                                            <Link to={'/Sync'}> Sync </Link>
                                        </PrimaryButton>
                                    );
                                }
                            }
                        ]}
                    />
                    <hr />
                    <hr />
                    <div className="container">
                        <Switch>
                            <Route exact path='/' render={() => <div> {signedIn ? <Home /> : <Splash openSignupDialog={this._openSignupDialog} />}</div>} />
                            <Route path='/Library' component={Library} />
                            <Route path='/Sync' component={Import} />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }

    _openLoginDialog = () => {
        this.setState({
            hideLoginDialog: false,
            hideSignupDialog: true,
        });
    }

    _closeLoginDialog = () => {
        this._checkStatus(),
            this.setState({
                hideLoginDialog: true
            });
    }

    _openSignupDialog = () => {
        this.setState({
            hideSignupDialog: false,
            hideLoginDialog: true,
        });
    }

    _closeSignupDialog = () => {
        this._checkStatus(),
            this.setState({
                hideSignupDialog: true,
                hideLoginDialog: true
            });
    }

    _checkStatus = () => {
        fetch('/Account/CheckLoginStatus')
            .then(res => res.json())
            .then((result) => {
                let userEmail = null;
                if (result.signedIn) {
                    userEmail = result.user.email
                }

                this.setState({
                    signedIn: result.signedIn,
                    userEmail
                });
            });
    }

    _logout = () => {
        fetch('/Account/Logout')
            .then(res => res.json())
            .then((result) => {
                this._checkStatus();
            });
    }
}