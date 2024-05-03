import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@/atom";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase";

const App = () => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useAtom(userAtom);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  //FUNCTION: Valida si el usuario esta logueado
  useEffect(() => {
    const validateUser = onAuthStateChanged(auth, (user) => {
      //* Usuario logged
      if (user) {
        if (router.pathname === "/") {
          router.push("/Dashboard");
        }
        //* Asigna el email del usuario
        setCurrentUser(user.email);
      }
      //* Usuario NO logged
      if (!user) {
        if (router.pathname !== "/") {
          router.push("/");
        }
      }
    });
    return () => validateUser();
  }, [router, setCurrentUser]);

  //FUNCTION: Variables del form (react-hook-form)
  const { register, handleSubmit } = useForm();

  //FUNCTION: onSubmit del form (react-hook-form)
  const onSubmit = async (data) => {
    //* Loading true
    setLoading(true);
    try {
      //* Enviando datos
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      //* Informacion del usuario
      const user = userCredential.user;
      //* Asigna el email del usuario
      setCurrentUser(user.email);
      //* Redirige a Dashboard
      router.push("/Dashboard");
    } catch (error) {
      setTimeout(() => {
        //* Error true
        setError(true);
        //* Loading false
        setLoading(false);
        //* Limpia los datos de los inputs
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
      }, 500);
    }
  };

  return (
    <main>
      <section className="pageSize flex min-h-[100svh]">
        <div className="mx-auto mt-36 h-fit w-full max-w-[400px] animate-fade-down animate-duration-[900ms]">
          {/*//* Titulo */}
          <h1 className=" font-semibold mb-4 text-[25px]">Inicia sesión</h1>
          {/*//* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/*//* Correo label */}
            <label>correo electrónico</label>
            {/*//* Correo input */}
            <input
              id="email"
              required
              type="text"
              placeholder=""
              {...register("email", { required: true })}
            />
            {/*//* Contraseña label */}
            <label>contraseña</label>
            {/*//* Contraseña input */}
            <input
              id="password"
              required
              type="password"
              placeholder=""
              {...register("password", { required: true })}
            />
            {/*//* Submit button */}
            {!loading ? (
              <input className="submit_btn" value="continuar" type="submit" />
            ) : (
              <div
                style={{ backgroundColor: "#cbcbcb", pointerEvents: "none" }}
                className="submit_btn flex relative justify-center mb-[10px] mt-[5px] border-none"
              >
                <div className="lds-ellipsis -ml-14 py-[10px] ">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            )}
            {/*//* Error text*/}
            {error && (
              <div className="error text-[12px] font-medium">
                Correo electrónico o contraseña incorrecta. Vuelve a intentarlo.
              </div>
            )}
          </form>
        </div>
      </section>
    </main>
  );
};

export default App;
