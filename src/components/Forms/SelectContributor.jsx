import React, { useContext, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import BuilderForm from "../Builder/BuilderForm";
import Select from "react-select";
import { deleteByIndex, parsePatern } from "../../utils/GeneratorUtils";
import { GlobalContext } from "../context/Global";
import swal from "sweetalert";
import toast from "react-hot-toast";
import { getContributor, getSchema } from "../../services/DmpServiceApi";
import styles from "../assets/css/form.module.css";

function SelectContributor({ label, name, changeValue, registry, keyValue, level, tooltip, header }) {
  const [list, setlist] = useState([]);

  const [show, setShow] = useState(false);
  const [options, setoptions] = useState(null);
  const [selectObject, setselectObject] = useState([]);
  const { form, setform, temp, settemp } = useContext(GlobalContext);
  const [index, setindex] = useState(null);
  const [registerFile, setregisterFile] = useState(null);
  const [role, setrole] = useState(null);

  /* A hook that is called when the component is mounted. */
  useEffect(() => {
    getContributor("token").then((res) => {
      const options = res.data.map((option) => ({
        value: option.firstName + " " + option.lastName,
        label: option.firstName + " " + option.lastName,
        object: option,
      }));
      setoptions(options);
    });
  }, []);

  /* A hook that is called when the component is mounted. */
  useEffect(() => {
    getSchema(registry, "token").then((res) => {
      setrole(res.properties.role["const@fr_FR"]);
      setregisterFile(res.properties.person.template_name);
      const template = res.properties.person["template_name"];
      getSchema(template, "token").then((res) => {
        setregisterFile(res);
      });

      if (!form[keyValue]) {
        return;
      }
      const patern = res.to_string;
      if (!patern.length) {
        return;
      }

      setlist(form[keyValue].map((el) => parsePatern(el, patern)));
    });
  }, [form[keyValue], registry]);

  /**
   * It closes the modal and resets the state of the modal.
   */
  const handleClose = () => {
    setShow(false);
    settemp(null);
    setindex(null);
  };
  /**
   * The function takes a boolean value as an argument and sets the state of the show variable to the value of the argument.
   * @param isOpen - boolean
   */
  const handleShow = (isOpen) => {
    setShow(isOpen);
  };

  /**
   * It takes the value of the input field and adds it to the list array.
   * @param e - the event object
   */
  const handleChangeList = (e) => {
    const patern = registerFile.to_string;
    const { object, value } = e;

    if (patern.length > 0) {
      setselectObject([...selectObject, object]);
      const parsedPatern = parsePatern(object, registerFile.to_string);
      setlist([...list, parsedPatern]);
      changeValue({ target: { name, value: [...selectObject, object] } });

      const newObject = { person: object, role: role };
      const arr3 = form[keyValue] ? [...form[keyValue], newObject] : [newObject];
      setform({ ...form, [keyValue]: arr3 });
    } else {
      changeValue({ target: { name, value } });
      setlist([...list, value]);
    }
  };

  /**
   * I want to delete an item from a list and then update the state of the list.
   */
  const handleDeleteListe = (idx) => {
    swal({
      title: "??tes-vous s??r ?",
      text: "Voulez-vous vraiment supprimer cet ??l??ment ?",
      icon: "info",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const newList = [...list];
        setlist(deleteByIndex(newList, idx));
        const deleteIndex = deleteByIndex(form[keyValue], idx);
        setform({ ...form, [keyValue]: deleteIndex });
        swal("Op??ration effectu??e avec succ??s!", {
          icon: "success",
        });
      }
    });
  };

  /**
   * If the index is not null, then delete the item at the index, add the temp item to the end of the array,
   * and then splice the item from the list array.
   * If the index is null, then just save the item.
   */
  const handleAddToList = () => {
    if (index !== null) {
      const objectPerson = { person: temp, role: role };
      setform({ ...form, [keyValue]: [...deleteByIndex(form[keyValue], index), objectPerson] });
      const parsedPatern = parsePatern(temp, registerFile.to_string);
      setlist([...deleteByIndex([...list], index), parsedPatern]);
    } else {
      handleSave();
    }
    toast.success("Enregistrement a ??t?? effectu?? avec succ??s !");
    settemp(null);
    handleClose();
  };

  /**
   * When the user clicks the save button, the function will take the temporary person object and add it to the form object, then it will parse the
   * temporary person object and add it to the list array, then it will close the modal and set the temporary person object to null.
   */
  const handleSave = () => {
    const objectPerson = { person: temp, role: role };
    setform({ ...form, [keyValue]: [...(form[keyValue] || []), objectPerson] });
    const parsedPatern = parsePatern(temp, registerFile.to_string);
    setlist([...list, parsedPatern]);
    handleClose();
    settemp(null);
  };

  /**
   * It sets the state of the temp variable to the value of the form[keyValue][idx] variable.
   * @param idx - the index of the item in the array
   */
  const handleEdit = (idx) => {
    settemp(form[keyValue][idx]["person"]);
    setShow(true);
    setindex(idx);
  };

  return (
    <>
      <div className="form-group">
        <label>{label}</label>
        {tooltip && (
          <span className="m-4" data-toggle="tooltip" data-placement="top" title={tooltip}>
            ?
          </span>
        )}
        <div className="row">
          <div className="col-md-10">
            <Select
              onChange={handleChangeList}
              options={options}
              name={name}
              //defaultValue={isEdit ? isEdit[name] : "S??lectionnez une valeur de la liste ou saisissez une nouvelle."}
              defaultValue={{
                label: temp ? temp[name] : "S??lectionnez une valeur de la liste ou saisissez une nouvelle.",
                value: temp ? temp[name] : "S??lectionnez une valeur de la liste ou saisissez une nouvelle.",
              }}
            />
          </div>
          <div className="col-md-2" style={{ marginTop: "8px" }}>
            <span>
              <a className="text-primary" href="#" aria-hidden="true" onClick={handleShow}>
                <i className="fas fa-plus-square" />
              </a>
            </span>
          </div>
        </div>

        {form[keyValue] && list && (
          <table style={{ marginTop: "20px" }} className="table table-bordered">
            <thead>
              {form[keyValue].length > 0 && header && (
                <tr>
                  <th scope="col">{header}</th>
                  <th scope="col"></th>
                </tr>
              )}
            </thead>
            <tbody>
              {form[keyValue].map((el, idx) => (
                <tr key={idx}>
                  <td scope="row">
                    <p className={`m2 ${styles.border}`}> {list[idx]} </p>
                  </td>
                  <td style={{ width: "10%" }}>
                    <div className="col-md-1">
                      {level === 1 && (
                        <span>
                          <a className="text-primary" href="#" aria-hidden="true" onClick={() => handleEdit(idx)}>
                            <i className="fa fa-edit" />
                          </a>
                        </span>
                      )}
                    </div>
                    <div className="col-md-1">
                      <span>
                        <a className="text-danger" href="#" aria-hidden="true" onClick={() => handleDeleteListe(idx)}>
                          <i className="fa fa-times" />
                        </a>
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <>
        {registerFile && (
          <Modal show={show} onHide={handleClose}>
            <Modal.Body>
              <BuilderForm shemaObject={registerFile} level={level + 1}></BuilderForm>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Fermer
              </Button>
              <Button variant="primary" onClick={handleAddToList}>
                Enregistrer
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </>
    </>
  );
}

export default SelectContributor;
