import React, { useEffect, useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/snippets/java";

interface Props {
  language: string;
  setInitialCode: any;
}

const CodeEditor = ({ language, setInitialCode }: Props) => {
  const [value, setValue] = useState(
    'public class Main {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}'
  );

  console.log(language);

  const javaInitialCode =
    'public class Main {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}';

  const cppInitialCode =
    '#include <iostream>\n\nint main() {\n\tstd::cout << "Hello World!" << std::endl;\n\treturn 0;\n}';

  const javascriptInitialCode = 'console.log("Hello World!");';
  const pythonInitialCode = 'print("Hello World!")';
  const rubyInitialCode = "puts 'Hello World!'";

  useEffect(() => {
    if (language === "Java") {
      setValue(javaInitialCode);
    } else if (language === "C++") {
      setValue(cppInitialCode);
    } else if (language === "JavaScript") {
      setValue(javascriptInitialCode);
    } else if (language === "Python") {
      setValue(pythonInitialCode);
    } else if (language === "Ruby") {
      setValue(rubyInitialCode);
    }
  }, [language]);

  return (
    <div>
      <AceEditor
        mode={language.toLowerCase()}
        theme="monokai"
        name="code-editor"
        height="20rem"
        width="60rem"
        fontSize={16}
        value={value}
        focus={true}
        enableBasicAutocompletion={true}
        enableLiveAutocompletion={true}
        enableSnippets={true}
        onChange={(newValue) => {
          setInitialCode(newValue);
          setValue(newValue);
        }}
      />
    </div>
  );
};

export default CodeEditor;
