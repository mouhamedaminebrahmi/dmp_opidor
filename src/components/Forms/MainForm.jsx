import { useContext, useEffect, useRef, useState } from "react";

//si type = string et inputtype = dropdown
import BuilderForm from "../../components/Builder/BuilderForm";
import { GlobalContext } from "../../components/context/Global";
import { checkRequiredForm } from "../../utils/GeneratorUtils";
import { getSchema } from "../../services/DmpServiceApi";
import CustumSpinner from "../../components/Shared/CustumSpinner";
import Main from "../../components/plans/Main";
import Redaction from "../../components/redaction/Redaction";

function MainForm({ SchemaId }) {
  console.log(SchemaId);
  const { form } = useContext(GlobalContext);
  const [standardTemplate, setstandardTemplate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    //DataStorageStandard
    //ProjectStandard
    setLoading(true);

    getSchema(SchemaId, "token")
      .then((el) => {
        setstandardTemplate(el);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [SchemaId]);

  /**
   * It checks if the form is filled in correctly.
   * @param e - the event object
   */
  const handleSaveForm = (e) => {
    e.preventDefault();
    const checkForm = checkRequiredForm(standardTemplate, form);
    console.log(form);
    // if (checkForm) {
    //   toast.error("Veuiller remplire le champs " + getLabelName(checkForm, standardTemplate));
    // } else {
    //   console.log(form);
    // }
  };

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  return (
    <>
      {loading && <CustumSpinner></CustumSpinner>}
      {!loading && error && <p>error</p>}
      {!loading && !error && standardTemplate && (
        <div style={{ margin: "15px" }}>
          <div className="row"></div>
          <div className="m-4">
            <BuilderForm shemaObject={standardTemplate} level={1}></BuilderForm>
          </div>
          <button onClick={handleSaveForm} className="btn btn-primary m-4">
            Enregistrer
          </button>
        </div>
      )}
    </>
  );
}

export default MainForm;
