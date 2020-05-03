import Auth0 from 'auth0-js';

export default class Auth {
    constructor(history) {
        this.history = history;
        this.auth0 = new Auth0.WebAuth({
            domain: 'lemaster-works.auth0.com',
            clientID: process.env.REACT_APP_CLIENT_ID,
            redirectUri: process.env.REACT_APP_REDIRECT_URI,
            audience: process.env.REACT_APP_AUDIENCE,
            responseType: "token id_token",
            scope: "openid profile email"
        });
        this.userProfile = null;
    }

    login = () => {
        this.auth0.authorize();
    }

    handleAuthentication = () => {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
            } else if (err) {
                this.history.push("/");
                alert(`Error: ${err.error}.`);
                console.log(err);
            }
        });
    }

    setSession = authResult => {
        const expiresAt = JSON.stringify(
            authResult.expiresIn * 1000 + new Date().getTime()
        );

        localStorage.setItem("access_token", authResult.accessToken);
        localStorage.setItem("id_token", authResult.idToken);
        localStorage.setItem("expires_at", expiresAt);

        this.getProfile((profile, err) => {
            if (profile) localStorage.setItem("email", profile.email);
            this.history.push("/");
        });
    }

    isAuthenticated() {
        const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
        return new Date().getTime() < expiresAt;
    }

    logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
        localStorage.removeItem("email");
        this.userProfile = null;
        this.auth0.logout({
            clientID: 'u7z730UjoZu8GY57Kc2cXELl7B4BPIrE',
            returnTo: "http://localhost:49283"
        });
    }

    getAccessToken = () => {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
            throw new Error("No access token found.");
        }

        return accessToken
    }

    getProfile = cb => {
        if (this.userProfile) return cb(this.userProfile);
        this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
            if (profile) this.userProfile = profile;
            cb(profile, err);
        });
    }
}