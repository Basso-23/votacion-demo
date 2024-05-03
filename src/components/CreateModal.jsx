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

const CreateModal = () => {
  const [botonDeshabilitado, setBotonDeshabilitado] = useState(true);

  //FUNCTION: Variables del form (react-hook-form)
  const { register, handleSubmit } = useForm();

  //FUNCTION: onSubmit del form (react-hook-form)
  const onSubmit = (data) => {
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
  };

  const checkInputs = () => {
    const valueNombre = document.getElementById("nombre").value;
    const valueApellido = document.getElementById("apellido").value;
    const valueDireccion = document.getElementById("direccion").value;
    const valueCedula = document.getElementById("cedula").value;
    if (
      valueNombre !== "" &&
      valueApellido !== "" &&
      valueDireccion !== "" &&
      valueCedula !== ""
    ) {
      setBotonDeshabilitado(false);
    } else {
      setBotonDeshabilitado(true);
    }
  };
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
                    <label>Cédula</label>
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
                    <label>Dirección</label>
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
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                </AlertDialogFooter>
              </form>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CreateModal;
