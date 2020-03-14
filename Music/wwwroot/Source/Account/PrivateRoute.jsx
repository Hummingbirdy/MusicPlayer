import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";

function PrivateRoute({ component: Component, auth, ...rest }) {
    return (
        <Route
            {...rest}
            render={props => {
                if (!auth.isAuthenticated()) return auth.login();

                return <Component auth={auth} {...props} />;
            }}
        />
    )
}

PrivateRoute.propTypes = {
    component: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,

}

export default PrivateRoute;