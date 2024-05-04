import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import Select from "react-dropdown-select";
import { centro } from "@/assets/json/centro";
import { mesa } from "@/assets/json/mesa";
import { dirigente } from "@/assets/json/dirigente";
import { keyMaker } from "@/utils/keyMaker";
import { getCurrentDate } from "@/utils/getCurrentDate";

const CreateModal = () => {
  const [botonDeshabilitado, setBotonDeshabilitado] = useState(true);
  const [valueCentro, setValueCentro] = useState("");
  const [valueMesa, setValueMesa] = useState("");
  const [valueDirigente, setValueDirigente] = useState("");

  //FUNCTION: Variables del form (react-hook-form)
  const { register, handleSubmit, resetField } = useForm();

  //FUNCTION: onSubmit del form (react-hook-form)
  const onSubmit = (data) => {
    data.centro = valueCentro;
    data.mesa = valueMesa;
    data.dirigente = valueDirigente;
    data.key = keyMaker(12);
    data.index = getCurrentDate();
    data.voto = "no";

    // Creamos un nuevo objeto para almacenar los valores en minúsculas
    const lowerCaseData = {};

    // Iteramos sobre todas las claves (propiedades) del objeto data
    for (let key in data) {
      // Verificamos si la propiedad es propia del objeto (no heredada)
      if (data.hasOwnProperty(key)) {
        // Convertimos el valor de la propiedad a minúsculas y lo asignamos al nuevo objeto
        lowerCaseData[key] = data[key].toLowerCase();
      }
    }

    console.log(lowerCaseData);

    limpiar();
  };

  const checkInputs = () => {
    const valueNombre = document.getElementById("apellido").value;
    const valueApellido = document.getElementById("apellido").value;
    const valueDireccion = document.getElementById("direccion").value;
    const valueCedula = document.getElementById("cedula").value;

    if (
      valueNombre !== "" &&
      valueApellido !== "" &&
      valueDireccion !== "" &&
      valueCedula !== "" &&
      valueCentro !== "" &&
      valueMesa !== "" &&
      valueDirigente !== ""
    ) {
      setBotonDeshabilitado(false);
    } else {
      setBotonDeshabilitado(true);
    }
  };

  const limpiar = () => {
    resetField("nombre");
    resetField("apellido");
    resetField("cedula");
    resetField("direccion");
    setValueCentro("");
    setValueMesa("");
    setValueDirigente("");
    checkInputs();
  };

  useEffect(() => {
    if (valueCentro || valueMesa || valueDirigente) {
      checkInputs();
    }
  }, [valueCentro, valueMesa, valueDirigente]);

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          {/*//* Registrar votante button */}
          <button
            style={{ paddingBottom: "13px", paddingTop: "13px" }}
            className="md:max-w-[150px] w-full submit_btn"
          >
            <div className="text-[13px]">Registrar votante</div>
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Registrar votante</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription asChild>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className=" grid grid-cols-2 gap-3">
                <div>
                  {/*//* Nombre label */}
                  <label>nombre</label>
                  {/*//* Nombre input */}
                  <input
                    id="nombre"
                    required
                    type="text"
                    placeholder=""
                    {...register("nombre", { required: true })}
                    onChange={() => {
                      checkInputs();
                    }}
                  />
                </div>

                <div>
                  {/*//* Apellido label */}
                  <label>apellido</label>
                  {/*//* Apellido input */}
                  <input
                    id="apellido"
                    required
                    type="text"
                    placeholder=""
                    {...register("apellido", { required: true })}
                    onChange={() => {
                      checkInputs();
                    }}
                  />
                </div>

                <div>
                  {/*//* Cedula label */}
                  <label>cédula</label>
                  {/*//* Cedula input */}
                  <input
                    id="cedula"
                    required
                    type="text"
                    placeholder=""
                    {...register("cedula", { required: true })}
                    onChange={() => {
                      checkInputs();
                    }}
                  />
                </div>

                <div>
                  {/*//* Direccion label */}
                  <label>dirección</label>
                  {/*//* Direccion input */}
                  <input
                    id="direccion"
                    required
                    type="text"
                    placeholder=""
                    {...register("direccion", { required: true })}
                    onChange={() => {
                      checkInputs();
                    }}
                  />
                </div>

                <div>
                  <div>
                    {/*//* Centro label */}
                    <label>centro de votacón</label>
                  </div>
                  {/*//* Centro select */}
                  <Select
                    options={centro}
                    labelField="label"
                    valueField="value"
                    onChange={(items) => {
                      setValueCentro(items[0].value);
                    }}
                  />
                </div>

                <div>
                  <div>
                    {/*//* Mesa label */}
                    <label>mesa</label>
                  </div>
                  {/*//* Mesa select */}
                  <Select
                    options={mesa}
                    labelField="label"
                    valueField="value"
                    onChange={(items) => {
                      setValueMesa(items[0].value);
                    }}
                  />
                </div>

                <div>
                  <div>
                    {/*//* Dirigente label */}
                    <label>dirigente</label>
                  </div>
                  {/*//* Dirigente select */}
                  <Select
                    options={dirigente}
                    labelField="label"
                    valueField="value"
                    onChange={(items) => {
                      setValueDirigente(items[0].value);
                    }}
                  />
                </div>
              </div>
              <AlertDialogFooter>
                <AlertDialogAction asChild disabled={botonDeshabilitado}>
                  <input
                    style={{ marginTop: 0, padding: 0 }}
                    className="submit_btn"
                    value="Guardar"
                    type="submit"
                  />
                </AlertDialogAction>
                <AlertDialogCancel onClick={limpiar}>
                  Cancelar
                </AlertDialogCancel>
              </AlertDialogFooter>
            </form>
          </AlertDialogDescription>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CreateModal;
