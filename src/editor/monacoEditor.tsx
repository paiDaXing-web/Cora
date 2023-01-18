import React, {
  useState,
  useCallback,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import Editor, { monaco } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import {
  useEditor,
  useMonaco,
  useModels,
  useModelIndex,
  useConsoleMessages,
  modelInfoType,
} from './editorContext';
import TopBar from './topBar/topBar';
import {
  setDynamicHeight,
  setModelsFromInfo,
  setTheme,
  setRunnerModel,
} from './mountFunctions';
import runFile, { runTestFile } from './utils/runFile';
import Console, { logsType } from './consoleLog';
import { Button } from './components/Button';
import './style.css';

type MonacoEditorProps = {
  id: string;
  modelsInfo: modelInfoType[];
  submissionCount?: number;
  onSuccess?: Dispatch<SetStateAction<number>>;
  onFailure?: Function;
};

function App({
  id,
  modelsInfo,
  submissionCount,
  onSuccess,
  onFailure,
}: MonacoEditorProps) {
  const [ctrlCounter, setControlCounter] = useState(0);
  const [height, setHeight] = useState(20);
  const [monacoInstance, setMonacoInstance] = useMonaco();
  const [logVisible, setlogVisible] = useState<boolean>(false);
  const [selectedIdx, setSelectedIdx] = useModelIndex();
  const [models, setModels] = useModels();
  const [ctxEditor, setCtxEditor] = useEditor();
  const [consoleMessages, setConsoleMessages] = useConsoleMessages();
  const editorCallbackRef = useCallback((ref: editor.IStandaloneCodeEditor) => {
    setCtxEditor(ref);
  }, []);
  const handleEditorDidMount = (
    _valueGetter: () => string,
    editor: editor.IStandaloneCodeEditor
  ) => {
    monaco.init().then(monaco => {
      // setDynamicHeight(editor, setHeight);
      setTheme(monaco);
      setMonacoInstance(monaco);
      editorCallbackRef(editor);
      setModelsFromInfo(modelsInfo, monaco, editor, setModels, setSelectedIdx);
      setRunnerModel(monaco);
      //Trigger useEffect with the control counter
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () =>
        setControlCounter(count => count + 1)
      );
      monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);
      let options = monaco.languages.typescript.javascriptDefaults.getCompilerOptions();
      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        ...options,
        strict: true,
        noImplicitAny: true,
      });
    });
  };

  //Gets triggered on ctrl+enter, hack to avoid getting trapped in closures.
  useEffect(() => {
    if (ctrlCounter > 0) {
      runFile(id, monacoInstance, models, selectedIdx, setConsoleMessages);
    }
  }, [ctrlCounter]);

  //Run tests when submission count increases//
  useEffect(() => {
    if (typeof submissionCount !== 'undefined') {
      const runTests = async () => {
        await runTestFile(id, monacoInstance, models, setConsoleMessages);
      };
      //do not run on mount
      if (submissionCount !== 0) {
        runTests();
      }
    }
  }, [submissionCount]);

  return (
    <>
      <div className="editor-box">
        <TopBar editorId={id} modelsInfo={modelsInfo}></TopBar>
        <div style={{ height: 'auto' }}>
          <Editor
            editorDidMount={handleEditorDidMount}
            language="typescript"
            height="90vh"
            // defaultValue="// some comment"
            loading={
              <div
                style={{
                  backgroundColor: '#1E1E1E',
                  color: '#919191',
                  paddingBottom: '10px',
                  width: '100%',
                  textAlign: 'center',
                  lineHeight: '80vh',
                  height: '100%',
                }}
              >
                Loading...
              </div>
            }
          />
        </div>

        <div
          //   style={{ backgroundColor: '#242424' }}
          className={logVisible ? 'console-box' : 'console-box-hidden'}
        >
          {Console && (
            <Console
              onSuccess={onSuccess}
              onFailure={onFailure}
              editorId={id}
              logVisible={logVisible}
            ></Console>
          )}
        </div>

        <div className="editor-bottom">
          <div
            className="console"
            onClick={() => {
              setlogVisible(!logVisible);
            }}
          >
            控制台
            {!logVisible ? (
              <svg
                viewBox="0 0 24 24"
                width="1em"
                height="1em"
                className="css-1lc17o4-icon"
              >
                <path fill-rule="evenodd" d="M7 10l5 5 5-5z"></path>
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                width="1em"
                height="1em"
                className="css-1lc17o4-icon"
              >
                <path fill-rule="evenodd" d="M7 14l5-5 5 5z"></path>
              </svg>
            )}
          </div>
          <Button
            text="运行"
            onClick={() => {
              console.log(1);
              setlogVisible(true);
            }}
          >
            运行
          </Button>
        </div>
      </div>
    </>
  );
}

export default App;
