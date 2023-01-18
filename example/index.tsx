// import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Editor from '../src/index';

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
            filename: 'new.ts',
            language: 'typescript',
          },
        ]}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
