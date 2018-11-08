//require('./lib');
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/site.css';


import React from 'react';
import ReactDOM from 'react-dom';
//import Counter from './reactComponent';
import Player from './Player.jsx';

//import ES6Lib from './es6codelib';

ReactDOM.render(
    <Player />,
    document.getElementById('content')
);

