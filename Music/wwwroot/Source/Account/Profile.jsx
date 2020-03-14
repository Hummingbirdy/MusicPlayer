import React, { Component } from 'react';
import { DefaultButton } from 'office-ui-fabric-react';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: null,
            err: null
        }
    }

    componentDidMount() {
        this._getProfile();
    }
    render() {
        let { auth } = this.props,
            { profile } = this.state;

        if (!profile) return null;
        return (
            <div>
                <h1>Profile</h1>
                <img
                    style={{ maxWidth: 50, maxHeight: 50 }}
                    src={profile.picture}
                    alt="profile picture"
                />
                <pre>{JSON.stringify(profile, null, 2)}</pre>
                <DefaultButton
                    onClick={() => auth.logout()}
                >
                    Logout
                </DefaultButton>
            </div>
        );
    }

    _getProfile = () => {
        this.props.auth.getProfile((profile, err) => this.setState({
            profile,
            err
        }));
    }
}