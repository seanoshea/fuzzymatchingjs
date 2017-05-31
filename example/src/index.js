import React from 'react';
import ReactDOM from 'react-dom';
import FuzzyMatchingJS from 'fuzzymatchingjs';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

console.warn('Do I have access to it?', FuzzyMatchingJS);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
