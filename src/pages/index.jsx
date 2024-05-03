import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@/atom";
import { useForm } from "react-hook-form";

const App = () => {
  const [currentUser, setCurrentUser] = useAtom(userAtom);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <main>
      <section className="pageSize flex min-h-[100svh]">
        <div className="mx-auto mt-36 h-fit w-full max-w-[400px]">
          <h1 className=" font-semibold mb-4 text-[25px]">Inicia sesión</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>correo electrónico</label>
            <input
              required
              placeholder=""
              {...register("nombre", { required: true })}
            />
            <label>contraseña</label>
            <input
              required
              placeholder=""
              {...register("edad", { required: true })}
            />
            <input className="submit_btn " value="continuar" type="submit" />
          </form>
        </div>
      </section>
    </main>
  );
};

export default App;
