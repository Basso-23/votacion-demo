import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@/atom";
import { adminAtom } from "@/atom";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";

const Navbar = () => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useAtom(userAtom);
  const [isAdmin, setIsAdmin] = useAtom(adminAtom);

  //FUNCTION: Valida si el usuario es admin
  useEffect(() => {
    //* Verifica si el currentuser tiene "@admin.com"
    const regex = /@admin\.com$/;
    const isValid = regex.test(currentUser);

    //* Asigna el valor a isAdmin"
    if (isValid) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [currentUser]);

  //FUNCTION: Cerrar Sesion
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      //* Redirige a Inicio
      router.push("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
    clean();
  };

  //FUNCTION: Limpia la variable que guarda el ID del usuario
  const clean = () => {
    setCurrentUser();
  };

  return (
    <main className=" w-full absolute border-b bg-white">
      <section className="pageSize flex justify-between sm:py-4 py-2">
        {/*//* Logo */}
        <div
          className="bg-contain bg-center w-[120px] aspect-[10/3] bg-no-repeat"
          style={{
            backgroundImage: "url('https://i.imgur.com/KePacDj.png')",
          }}
        ></div>
        {currentUser && (
          <div className="flex items-center ">
            {/*//* Cuenta */}
            <div className="text-[#0061FE] text-[13px] font-semibold sm:flex hidden">
              {isAdmin ? <div>ADMIN</div> : <div>DIRIGENTE</div>}
            </div>

            {/*//* Cerrar sesión */}
            <button
              onClick={handleSignOut}
              className=" border-l pl-4 ml-4 text-sm tracking-wide transition-all hover:text-[#0061FE]"
            >
              Cerrar Sesión
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default Navbar;
