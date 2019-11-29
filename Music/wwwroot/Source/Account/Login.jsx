import * as React from 'react';
import {
    TextField,
    PrimaryButton,    Dialog, DialogType, DialogFooter,
    Checkbox,
    DefaultButton,
    MessageBar,
    MessageBarType,
    Link
} from 'office-ui-fabric-react';

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            rememberMe: true,
            errorMessage: null
        }
    }

    render() {
        let { email, password, rememberMe, errorMessage } = this.state,
            { hideDialog, onDismiss, switchToSignup } = this.props;
        return (
            <Dialog
                hidden={hideDialog}
                onDismiss={onDismiss}
                dialogContentProps={{
                    type: DialogType.normal,
                    title: 'Login'
                }}
            >
                <TextField
                    label="Email"
                    value={email}
                    onChange={(ev, value) => {
                        let email = value;
                        this.setState({
                            email
                        });
                    }}
                />
                <TextField
                    label="Password"
                    value={password}
                    type='password'
                    onChange={(ev, value) => {
                        let password = value;
                        this.setState({
                            password
                        });
                    }}
                />
                <br />
                <DialogFooter>
                    <div>
                        {
                            errorMessage != null &&
                            <MessageBar
                                messageBarType={MessageBarType.error}
                                isMultiline={true}
                            >
                                {errorMessage}
                            </MessageBar>
                }
                        <div
                            style={{ display: 'flex', justifyContent: 'space-between' }}
                        >
                            <Checkbox
                                label="Stay signed in"
                                checked={rememberMe}
                                onChange={(ev, checked) => {
                                    let rememberMe = checked;
                                    this.setState({
                                        rememberMe
                                    });
                                }}
                            />
                            <DefaultButton
                                text="Login"
                                className='default-button'
                                onClick={() => this._login()}
                            />
                        </div>
                        <br />
                        <div
                            style={{ display: 'flex', justifyContent: 'center' }}
                        >
                            <DefaultButton
                                text="Create an account"
                                onClick={switchToSignup}
                            />
                        </div>
                    </div>
                </DialogFooter>
            </Dialog>
        );
    }

    _login = () => {
        let { email, password, rememberMe } = this.state,
            model = {
                Email: email,
                Password: password,
                RememberMe: rememberMe
            };
        fetch('/Account/LoginApi', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model)
        })
            .then(res => res.json())
            .then((response) => {
                if (response.success) {
                    this.setState({
                        errorMessage: null
                    }),
                        this.props.onDismiss();
                }
                else {
                    this.setState({
                        errorMessage: response.message
                    });
                }
            });
    }
}