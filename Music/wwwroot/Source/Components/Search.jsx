import * as React from 'react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { DefaultButton} from 'office-ui-fabric-react/lib/Button';

export class Search extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <SearchBox
                    placeholder="Search for Songs"
                    onSearch={value => {
                        this.props.addSearchTerm(value)
                    }}
                />
                <div>
                    {this.props.searchTerms.map((v, i) => (
                        <span>{v} </span>
                    ))}
                </div>
                <div style={{ 'textAlign': 'right' }}>
                    <DefaultButton
                        text='Search'
                        onClick={() => this.props.search()}
                    />
                </div>
            </div>
        );
    }

}