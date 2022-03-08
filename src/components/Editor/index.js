import React from "react";
import MDEditor from '@uiw/react-md-editor';

export function Editor({ view = true, value = '', setValue }) {
  if (!value) {
    value = ""
  }

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