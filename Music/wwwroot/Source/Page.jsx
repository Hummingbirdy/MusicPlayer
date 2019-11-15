import * as React from 'react';
import {
    initializeIcons,
    OverflowSet, CommandBarButton,
    CommandBar,
    loadTheme,

    DefaultButton,
    PrimaryButton
} from 'office-ui-fabric-react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Main/Home.jsx';
import Library from './Library/Library.jsx';
import Import from './Import/Import.jsx';

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
    }

    render() {
        return (
            <Router>
                <div>
                    <CommandBar
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
                                        <PrimaryButton>
                                            <Link to={'/Library'}> Library </Link>
                                        </PrimaryButton>
                                    );
                                }
                            }, {
                                key: 'sync',
                                name: 'Sync',
                                onRender: () => {
                                    return (
                                        <PrimaryButton>
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
                            <Route exact path='/' component={Home} />
                            <Route path='/Library' component={Library} />
                            <Route path='/Sync' component={Import} />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}