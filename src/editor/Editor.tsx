import React, { Dispatch, SetStateAction } from 'react';
import MonacoEditor from './monacoEditor';
// import dynamic from "next/dynamic";
// let MonacoEditor = dynamic(() => import("./monacoEditor"), { ssr: false });
import { EditorProvider, modelsInfoType } from './editorContext';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Height } from '@material-ui/icons';

export type editorProps = {
  id: string;
  modelsInfo: modelsInfoType;
  onSuccess?: Dispatch<SetStateAction<number>>;
  onFailure?: Function;
  submissionCount?: number;
  height?: number;
  language?: string;
};

export default function Editor({
  id,
  modelsInfo,
  onSuccess,
  onFailure,
  submissionCount,
  height = 300,
}: editorProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      <EditorProvider>
        <MonacoEditor
          submissionCount={submissionCount}
          onSuccess={onSuccess}
          onFailure={onFailure}
          id={id}
          modelsInfo={modelsInfo}
          height={height}
        />
      </EditorProvider>
    </DndProvider>
  );
}
