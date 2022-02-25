import React, { useState } from "react";
import MDEditor from '@uiw/react-md-editor';

export function Editor({ view = true }) {
  const [value, setValue] = useState('A simple markdown editor with preview, implemented with React.js and TypeScript. This React Component aims to provide a simple Markdown editor with syntax highlighting support. This is based on `textarea` encapsulation, so it does not depend on any modern code editors such as Acs, CodeMirror, Monaco etc.\n\n### Features\n\n- 📑 Indent line or selected text by pressing tab key, with customizable indentation.\n- ♻️ Based on `textarea` encapsulation, does not depend on any modern code editors.\n- 🚧 Does not depend on the [`uiw`](https://github.com/uiwjs/uiw) component library.\n- 🚘 Automatic list on new lines.\n- 😻 GitHub flavored markdown support.\n- 💡 Support [next.js](https://github.com/uiwjs/react-md-editor/issues/52#issuecomment-848969341), [Use examples](#support-nextjs) in [next.js](https://nextjs.org/).\n\n### Quick Start\n\n```bash\nnpm i @uiw/react-md-editor\n```\n')

  return (
    <div className="container-fluid">
      {!view &&
        <MDEditor
          value={value}
          onChange={setValue}
        />
      }

      {view &&
        <MDEditor.Markdown source={value} />
      }
    </div>
  );
}