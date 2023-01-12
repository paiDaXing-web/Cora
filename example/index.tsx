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
            value: 'console.log("make a new file")',
            filename: 'new.ts',
            language: 'typescript',
          },
        ]}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
