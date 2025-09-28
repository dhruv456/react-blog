import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./../editor-dark.css";
import React, { useState } from "react";

const RTE = ({ onChange, value }) => {
  return (
    <div className="prose">
      <h2>React CKEditor Example</h2>
      <div className="my-editor">
        <CKEditor
          editor={ClassicEditor}
          data={value}
          onChange={(event, editor) => {
            onChange(editor.getData());
          }}
          config={{
            toolbar: [
              "heading",
              "|",
              "bold",
              "italic",
              "link",
              "bulletedList",
              "|",
              "numberedList",
              "blockQuote",
            ],
          }}
          onReady={(editor) => {
            console.log("Editor is ready to use!", editor);
          }}
        />
      </div>
    </div>
  );
};

export default RTE;
