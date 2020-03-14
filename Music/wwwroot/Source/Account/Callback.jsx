import React, { Component } from 'react';
import { Spinner, SpinnerType } from 'office-ui-fabric-react';

export default class Callback extends Component {
    componentDidMount() {
        if (/access_token|id_token|error/.test(this.props.location.hash)) {
            this.props.auth.handleAuthentication();
        } else {
            throw new Error("Invalid callback url");
        }
    }
    render() {
        return <Spinner label="Loading" size={SpinnerType.large} />
    }
}