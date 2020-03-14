import React, { Component } from 'react';
import {
    CommandBar,
    CommandBarButton,
    PrimaryButton,
    DefaultButton,
} from 'office-ui-fabric-react';
import { Link as FabricLink } from 'office-ui-fabric-react';
import { Link } from 'react-router-dom';

export default class Nav extends Component {
    render() {
        let isAuthenticated = this.props.auth.isAuthenticated();

        return (
            <CommandBar
                farItems={[
                    {
                        key: 'login',
                        onRender: () => {
                            return (
                                <div>
                                    {
                                        isAuthenticated ?
                                            <div className="align-centered" >
                                                <CommandBarButton
                                                    text={localStorage.getItem("email")}
                                                    menuProps={{
                                                        items: [
                                                            {
                                                                key: 'profile',
                                                                onRender: () => {
                                                                    return <Link to={'/profile'}> Profile </Link>
                                                                }
                                                            },
                                                            {
                                                                key: 'logout',
                                                                onRender: () => {
                                                                    return <FabricLink onClick={() => this.props.auth.logout()}> Log Out </FabricLink>
                                                                }
                                                            }
                                                        ]
                                                    }}
                                                />
                                            </div>
                                            :
                                            <div>
                                                <PrimaryButton
                                                    onClick={() => auth.login()}
                                                >
                                                    Log In
                                                </PrimaryButton>
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
                                >
                                    <Link to={'/library'}> Library </Link>
                                </PrimaryButton>
                            );
                        }
                    }, {
                        key: 'sync',
                        name: 'Sync',
                        onRender: () => {
                            return (
                                <PrimaryButton
                                >
                                    <Link to={'/sync'}> Sync </Link>
                                </PrimaryButton>
                            );
                        }
                    }
                ]}
            />
        );
    }
}