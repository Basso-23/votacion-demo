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
      //* SI esta logueado se asigna la key del usuario a la variable userState y no puede ver la pantalla de Login
      if (user) {
        if (router.pathname === "/") {
          router.push("/Dashboard");
        }
        //* Asigna el email del usuario a la variable userState
        setCurrentUser(user.email);
      }
      //* NO esta logueado, redirige a Login
      if (!user) {
        if (router.pathname !== "/") {
          router.push("/");
        }
      }
    });

    return () => validateUser();
  }, [router, setCurrentUser]);

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    //* Muestra el loader
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      //* Asigna el email del usuario a la variable userState
      setCurrentUser(user.email);
      //* Quita el mensaje de error
      setError(false);
      //* Redirige a Dashboard
      router.push("/Dashboard");
    } catch (error) {
      setTimeout(() => {
        //* Muestra el mensaje de error
        setError(true);
        //* Quita el loader
        setLoading(false);
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
      }, 500);

      console.log("Error al iniciar sesión:", error);
    }
  };

  return (
    <main>
      <section className="pageSize flex min-h-[100svh]">
        <div className="mx-auto mt-36 h-fit w-full max-w-[400px] animate-fade-down animate-duration-[900ms]">
          <h1 className=" font-semibold mb-4 text-[25px]">Inicia sesión</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>correo electrónico</label>
            <input
              id="email"
              required
              type="text"
              placeholder=""
              {...register("email", { required: true })}
            />
            <label>contraseña</label>
            <input
              id="password"
              required
              type="password"
              placeholder=""
              {...register("password", { required: true })}
            />

            {!loading ? (
              <input className="submit_btn" value="continuar" type="submit" />
            ) : (
              <div
                style={{ backgroundColor: "#cbcbcb", pointerEvents: "none" }}
                className="submit_btn flex relative justify-center mb-[10px] mt-[5px] border-none"
              >
                <div className="lds-ellipsis -ml-14 py-[11px] ">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            )}
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
