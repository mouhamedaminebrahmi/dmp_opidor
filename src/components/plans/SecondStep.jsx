import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { getDefaultModel, getFunder, getFunderById, getOrganisme, getOtherOrganisme, getOtherOrganismeById } from "../../services/DmpPlansApi";
import { GlobalContext } from "../context/Global";
import swal from "sweetalert";
import styles from "../assets/css/steps.module.css";
import CustumButton from "../Styled/CustumButton";
import CircleTitle from "../Styled/CircleTitle";

function SecondStep() {
  const { context, setContext } = useContext(GlobalContext);
  const [defaultModel, setdefaultModel] = useState(null);
  const [defaultId, setdefaultId] = useState(null);
  const [otherOrganisme, setOtherOrganisme] = useState(null);
  const [listFunder, setlistFunder] = useState(null);
  const [listOrganisme, setListOrganisme] = useState(null);
  const [isShowListOrganizme, setisShowListOrganizme] = useState(false);
  const [isShowOrganizme, setisShowOrganizme] = useState(false);
  const [isShowFunder, setisShowFunder] = useState(false);
  const [funders, setFunders] = useState(null);
  const [organismes, setorganismes] = useState(null);
  const [valueOtherOrganisme, setvalueOtherOrganisme] = useState("Commencez à taper pour voir une liste de suggestions");
  const [valueFunder, setvalueFunder] = useState("Commencez à taper pour voir une liste de suggestions");
  const [isShowOtherOrganisme, setisShowOtherOrganisme] = useState(false);
  const [isShowListFunder, setisShowListFunder] = useState(false);

  /* A hook that is called when the component is mounted. It is used to fetch data from an API. */
  useEffect(() => {
    getOrganisme().then((res) => {
      setListOrganisme(res.data.templates);
    });
  }, [context]);

  /* A hook that is called when the component is mounted. It is used to fetch data from an API. */
  useEffect(() => {
    getDefaultModel().then((res) => {
      setdefaultModel(res.data);
      setContext({ ...context, template_id: res.data.id });
      setdefaultId(res.data.id);
    });
  }, []);

  /* A hook that is called when the component is mounted. It is used to fetch data from an API. */
  useEffect(() => {
    getOtherOrganisme().then((res) => {
      const options = res.data.map((option) => ({
        value: option.id,
        label: option.sort_name,
        object: option,
      }));
      setOtherOrganisme(options);
    });
  }, []);

  /* A hook that is called when the component is mounted. It is used to fetch data from an API. */
  useEffect(() => {
    getFunder().then((res) => {
      const options = res.data.map((option) => ({
        value: option.id,
        label: option.sort_name,
        object: option,
      }));
      setlistFunder(options);
    });
  }, []);

  /**
   * If the value is 1, 2, or 3, then set the value of isShowListOrganizme to false, set the value of isShowOrganizme to false, set the value of organismes
   * to null, set the value of isShowFunder to false, set the value of valueFunder to "Commencez à taper pour voir une liste de suggestions", set the value
   * of isShowOtherOrganisme to true, and set the value of isShowListFunder to false.
   *
   * If the value is 2, then set the value of isShowListOrganizme to true, set the value of isShowOrganizme to false, set the value of organismes to null,
   * set the value of isShowFunder to false, set the value of valueFunder to "Commencez à taper pour voir une liste de suggestions", set the value of
   * isShowOtherOrgan
   */
  const handleCheckOption = (val) => {
    switch (val) {
      case "1":
        //state
        setContext({ ...context, ["template_id"]: defaultId });
        //
        setisShowListOrganizme(false);
        setisShowOrganizme(false);

        //condition 3
        setorganismes(null);
        setisShowFunder(false);
        setvalueFunder("Commencez à taper pour voir une liste de suggestions");
        setisShowOtherOrganisme(true);
        setisShowListFunder(false);

        //condition 4
        setvalueOtherOrganisme("Commencez à taper pour voir une liste de suggestions");
        setisShowListFunder(false);
        setisShowOtherOrganisme(false);

        break;
      case "2":
        //state
        setContext({ ...context, ["template_id"]: null });
        //
        setisShowListOrganizme(true);
        setisShowOrganizme(false);
        //condition 3
        setorganismes(null);
        setisShowFunder(false);
        setvalueFunder("Commencez à taper pour voir une liste de suggestions");
        setisShowOtherOrganisme(true);
        setisShowListFunder(false);
        //condition 4
        setvalueOtherOrganisme("Commencez à taper pour voir une liste de suggestions");
        setisShowListFunder(false);
        setisShowOtherOrganisme(false);
        break;
      case "3":
        //state
        setContext({ ...context, ["template_id"]: null });
        //
        setisShowListOrganizme(false);
        setisShowOrganizme(false);
        //condition 3
        setorganismes(null);
        setisShowFunder(false);
        setvalueFunder("Commencez à taper pour voir une liste de suggestions");
        setisShowOtherOrganisme(true);
        setisShowListFunder(false);
        break;
      default:
        //state
        setContext({ ...context, ["template_id"]: null });
        //
        setisShowListOrganizme(false);
        setisShowOrganizme(false);
        //condition 4
        setvalueOtherOrganisme("Commencez à taper pour voir une liste de suggestions");
        setisShowListFunder(true);
        setisShowOtherOrganisme(false);
        break;
    }
  };

  /**
   * I want to make an API call to get some data. I
   * want to set the state of the component to the data I get from the API call.
   * I'm using the react-select library to create a dropdown menu.
   */
  const handleChangeOtherOrganisme = (e) => {
    getOtherOrganismeById("", e.object, context).then((res) => {
      setorganismes(res.data.templates);
      setisShowOrganizme(true);
      setvalueOtherOrganisme(e.label);
    });
  };

  /**
   * I'm trying to get the value of the selected option from the d
   * ropdown and pass it to the function getFunderById.
   */
  const handleChangeFunder = (e) => {
    getFunderById("", e.object, context).then((res) => {
      setFunders(res.data.templates);
      setisShowFunder(true);
      setvalueFunder(e.label);
    });
  };

  const handleSendTemplateId = () => {
    if (context["template_id"]) {
      console.log(context);
    } else {
      swal({
        icon: "error",
        title: "Oops...",
        text: "Vous devez choisir un modèle",
      });
    }
  };

  return (
    <div>
      <CircleTitle number="2" title="Choisissez votre modèle"></CircleTitle>
      <div className="column">
        <div className="form-check">
          <input
            className={`form-check-label ${styles.check}`}
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
            defaultChecked
            onClick={() => handleCheckOption("1")}
          />
          <label className={`form-check-label ${styles.label_title}`} htmlFor="flexRadioDefault1">
            Modèle par défaut
          </label>
          <div className={styles.list_context}>{defaultModel && defaultModel?.title}</div>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onClick={() => handleCheckOption("2")} />
          <label className={`form-check-label ${styles.label_title}`} htmlFor="flexRadioDefault2">
            INRAE (votre organisme)
          </label>

          <div className={styles.list_organisme}>
            {isShowListOrganizme &&
              listOrganisme &&
              listOrganisme.map((el) => (
                <label key={el.id} className={`${styles.element_organisme} ${styles.label_sous_title}`}>
                  <input type="radio" id={el.id} name="contact" onClick={() => setContext({ ...context, ["template_id"]: el.id })} />
                  {/* <label htmlFor={el.id}>{el.title}</label> */}
                  <div className={styles.list_element}>{el.title}</div>
                </label>
              ))}
          </div>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" onClick={() => handleCheckOption("3")} />
          <label className={`form-check-label ${styles.label_title}`} htmlFor="flexRadioDefault3">
            Autre organisme
          </label>
          <div className={styles.select}>
            {isShowOtherOrganisme && otherOrganisme && (
              <Select
                options={otherOrganisme}
                onChange={handleChangeOtherOrganisme}
                value={{
                  label: valueOtherOrganisme,
                  value: valueOtherOrganisme,
                }}
              />
            )}
            <div className={styles.list_organisme}>
              {isShowOrganizme &&
                organismes &&
                organismes.map((el) => (
                  <label key={el.id} className={`${styles.element_organisme} ${styles.label_sous_title}`}>
                    <input type="radio" id={el.id} name="contact" onClick={() => setContext({ ...context, ["template_id"]: el.id })} />
                    {/* <label htmlFor={el.id}>{el.title}</label> */}
                    <div className={styles.list_element}>{el.title}</div>
                  </label>
                ))}
            </div>
          </div>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4" onClick={() => handleCheckOption("4")} />
          <label className={`form-check-label ${styles.label_title}`} htmlFor="flexRadioDefault4">
            Financeur
          </label>
          <div className={styles.select}>
            {isShowListFunder && listFunder && (
              <Select
                options={listFunder}
                onChange={handleChangeFunder}
                value={{
                  label: valueFunder,
                  value: valueFunder,
                }}
              />
            )}

            <div className={styles.list_organisme}>
              {isShowFunder &&
                funders &&
                funders.map((el) => (
                  <label key={el.id} className={`${styles.element_organisme} ${styles.label_sous_title}`}>
                    <input type="radio" id={el.id} name="contact" onClick={() => setContext({ ...context, ["template_id"]: el.id })} />
                    {/* <label htmlFor={el.id}>{el.title}</label> */}
                    <div className={styles.list_element}>{el.title}</div>
                  </label>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {/* <button type="button" className="btn btn-primary validate" onClick={handleSendTemplateId}>
          Valider mon choix
        </button> */}
        <CustumButton handleNextStep={handleSendTemplateId} title="Valider mon choix"></CustumButton>
      </div>
    </div>
  );
}

export default SecondStep;
