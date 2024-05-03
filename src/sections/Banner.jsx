import React, { useState, useEffect } from "react";
import Question from "@/assets/icons/Question";
import { useAtom } from "jotai";
import { userAtom } from "@/atom";
import { adminAtom } from "@/atom";
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

const Banner = () => {
  const [currentUser, setCurrentUser] = useAtom(userAtom);
  const [isAdmin, setIsAdmin] = useAtom(adminAtom);
  const [botonDeshabilitado, setBotonDeshabilitado] = useState(true);

  //FUNCTION: Variables del form (react-hook-form)
  const { register, handleSubmit } = useForm();

  //FUNCTION: onSubmit del form (react-hook-form)
  const onSubmit = (data) => {
    console.log(data);
  };

  const checkInputs = () => {
    const valueNombre = document.getElementById("nombre").value;
    const valueApellido = document.getElementById("apellido").value;
    if (valueNombre !== "" && valueApellido) {
      setBotonDeshabilitado(false);
    } else {
      setBotonDeshabilitado(true);
    }
  };

  return (
    <section className=" w-full rounded-sm overflow-hidden shadow text-sm mb-10 ">
      {/*//* Nota */}
      <div className="w-full bg-[#CFEEFF] text-[#125486] py-3 px-4 flex font-medium">
        <span className="mr-[6px] mt-[1.5px] text-[17px]">
          <Question />
        </span>
        <div className="text-[13px]">
          Nota: Su cuenta tiene permisos como{" "}
          {isAdmin ? <span>administrador</span> : <span>dirigente</span>}
        </div>
      </div>

      <div className="w-full bg-white p-4">
        {/*//* Cuenta */}
        <h1 className=" mb-4">
          Sesión iniciada con la cuenta: {""}
          <span className="font-semibold lowercase">{currentUser}</span>
        </h1>

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
                  {/*//* Correo label */}
                  <label>nombre</label>
                  {/*//* Correo input */}
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
                  {/*//* Contraseña label */}
                  <label>apellido</label>
                  {/*//* Contraseña input */}
                  <input
                    id="apellido"
                    required
                    type="apellido"
                    placeholder=""
                    {...register("apellido", { required: true })}
                    onChange={() => {
                      checkInputs();
                    }}
                  />
                  <AlertDialogFooter>
                    <AlertDialogAction asChild disabled={botonDeshabilitado}>
                      <input
                        style={{ marginTop: 0 }}
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
      </div>
    </section>
  );
};

export default Banner;
