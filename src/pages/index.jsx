import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@/atom";
import { useForm } from "react-hook-form";

const App = () => {
  const [currentUser, setCurrentUser] = useAtom(userAtom);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <main>
      <section className="pageSize flex min-h-screen">
        <div className="m-auto h-fit">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              required
              placeholder="nombre"
              {...register("nombre", { required: true })}
            />
            <input
              required
              placeholder="edad"
              {...register("edad", { required: true })}
            />
            <input type="submit" />
          </form>
        </div>
      </section>
    </main>
  );
};

export default App;
