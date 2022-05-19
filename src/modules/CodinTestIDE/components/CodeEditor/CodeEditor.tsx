import React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/snippets/java";

interface Props {
  sourceCode: string;
  mode: string;
  setSourceCode: any;
}
const CodeEditor = ({ sourceCode, mode, setSourceCode }: Props) => {
  return (
    <div>
      <AceEditor
        mode={mode.toLowerCase()}
        // mode="java"
        theme="github"
        name="code-editor"
        height="24rem"
        width="40rem"
        fontSize={16}
        value={sourceCode}
        focus={true}
        enableBasicAutocompletion={true}
        enableLiveAutocompletion={true}
        enableSnippets={true}
        onChange={(newValue) => {
          setSourceCode(newValue);
        }}
      />
    </div>
  );
};

export default CodeEditor;
