// import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Editor from '../dist/index';
import '../dist/cora.cjs.development.css';

const App = () => {
  return (
    <div>
      <Editor
        id="10"
        modelsInfo={[
          {
            value: `/**
* @param {string} s
* @param {string} t
* @return {number}
*/
console.log([1,1,1,1])`,
            filename: 'new.js',
            language: 'javascript',
          },
        ]}
        height={600}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
