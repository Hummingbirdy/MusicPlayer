import * as React from 'react';
import {
    TextField,
    PrimaryButton,    Dialog, DialogType, DialogFooter,
    Checkbox,
    DefaultButton,
    MessageBar,
    MessageBarType
} from 'office-ui-fabric-react';

export default class Signup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: null,
            password: null,
            confirmPassword: null,
            errorMessage: null
        }
    }

    render() {
        let { email, password, confirmPassword, errorMessage } = this.state,
            { hideDialog, onDismiss, switchToLogin } = this.props;

        return (
            <Dialog
                hidden={hideDialog}
                onDismiss={onDismiss}
                dialogContentProps={{
                    type: DialogType.normal,
                    title: 'Sign Up'
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
                <TextField
                    label="Confirm Password"
                    value={confirmPassword}
                    type='password'
                    onChange={(ev, value) => {
                        let confirmPassword = value;
                        this.setState({
                            confirmPassword
                        });
                    }}
                />

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
                            className='align-far-right'
                        >
                            <DefaultButton
                                text="Submit"
                                className='default-button'
                                onClick={() => this._signup()}
                            />
                        </div>
                        <br />
                        <div
                            style={{ display: 'flex', justifyContent: 'center' }}
                        >
                            <DefaultButton
                                text="Log in with existing account"
                                onClick={switchToLogin}
                            />
                        </div>
                    </div>
                </DialogFooter>
            </Dialog>
        )

    }

    _signup = () => {
        let { email, password, confirmPassword } = this.state,
            model = {
                Email: email,
                Password: password,
                ConfirmPassword: confirmPassword
            };
        fetch('/Account/Register', {
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