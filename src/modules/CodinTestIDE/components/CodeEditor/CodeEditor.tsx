import React, { useEffect, useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/snippets/java";

interface Props {
  initialCode: string;
}
const CodeEditor = ({ initialCode }: Props) => {
  return (
    <div>
      <AceEditor
        // mode={language.toLowerCase()}
        mode="java"
        theme="github"
        name="code-editor"
        height="24rem"
        width="50rem"
        fontSize={16}
        value={initialCode}
        focus={true}
        enableBasicAutocompletion={true}
        enableLiveAutocompletion={true}
        enableSnippets={true}
        onChange={(newValue) => {
          //   setInitialCode(newValue);
          //   setValue(newValue);
        }}
      />
    </div>
  );
};

export default CodeEditor;
