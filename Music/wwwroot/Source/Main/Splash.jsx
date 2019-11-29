import * as React from 'react';
import { PrimaryButton } from 'office-ui-fabric-react';

export default class Splash extends React.Component {
    render() {

        return (
            <div style={{ width: '100%', height: '88vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                <div style={{ width: '60%', height: '60%', backgroundColor: '#133534', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
                    <div style={{ fontSize: '10em', fontWeight: 'bolder', color: '#fbfbfa' }}>
                        Melody
                    </div>                      
                    <div>
                        <PrimaryButton
                            onClick={() => this.props.openSignupDialog()}
                        >
                            Sign up to get started
                    </PrimaryButton>
                    </div>
                </div>
            </div>
        )
    }
}
