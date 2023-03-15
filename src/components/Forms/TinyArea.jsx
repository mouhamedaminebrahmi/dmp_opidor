import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/Global";
import { Editor } from "@tinymce/tinymce-react";
import styles from "../assets/css/form.module.css";

function TinyArea({ label, name, changeValue, tooltip, level, schemaId }) {
  const { form, temp } = useContext(GlobalContext);
  const [text, settext] = useState("<p></p>");

  useEffect(() => {
    const defaultValue = temp ? temp[name] : form?.[schemaId]?.[name] ? form?.[schemaId]?.[name] : "<p></p>";
    const updatedText = level === 1 ? defaultValue : temp ? temp[name] : "<p></p>";
    settext(updatedText);
  }, [level, name]);

  const handleChange = (e) => {
    changeValue({ target: { name: name, value: e } });
    settext(e);
  };
  return (
    <div className={`form-group ticket-summernote mr-4 ml-4 ${styles.form_margin}`}>
      <div className="row">
        <div className={styles.label_form}>
          <strong className={styles.dot_label}></strong>
          <label>{label}</label>
          {tooltip && (
            <span className="" data-toggle="tooltip" data-placement="top" title={tooltip}>
              ?
            </span>
          )}
        </div>

        <div style={{ marginTop: "10px" }}>
          <Editor
            apiKey={"xvzn7forg8ganzrt5s9id02obr84ky126f85409p7ny84ava"}
            onEditorChange={(newText) => handleChange(newText)}
            // onInit={(evt, editor) => (editorRef.current = editor)}
            value={text}
            name={name}
            init={{
              branding: false,
              height: 200,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | " +
                "bold italic backcolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default TinyArea;
