import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { useForm } from "react-hook-form";
import { useAtom } from "jotai";
import { userAtom } from "@/atom";
import { adminAtom } from "@/atom";

import Banner from "@/sections/Banner";

import Select from "react-dropdown-select";
import { centro } from "@/assets/json/centro";
import { mesa } from "@/assets/json/mesa";
import { dirigente } from "@/assets/json/dirigente";

const Dashboard = () => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useAtom(userAtom);
  const [isAdmin, setIsAdmin] = useAtom(adminAtom);

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

  return (
    <main className="sm:pt-[6rem] pt-[5rem]">
      <div className="pageSize min-h-[100svh]">
        <Banner />
      </div>
    </main>
  );
};

export default Dashboard;
