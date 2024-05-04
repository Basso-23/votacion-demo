import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import {
  firebase_delete,
  firebase_edit,
  firebase_read,
  firebase_write,
} from "@/firebase/firebase";
import { useAtom } from "jotai";
import { userAtom } from "@/atom";
import { adminAtom } from "@/atom";
import { originalAtom } from "@/atom";
import { dataAtom } from "@/atom";
import Banner from "@/sections/Banner";

const Dashboard = () => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useAtom(userAtom);
  const [isAdmin, setIsAdmin] = useAtom(adminAtom);
  const [original, setOriginal] = useAtom(originalAtom);
  const [data, setData] = useAtom(dataAtom);

  useEffect(() => {
    //* nombre de la coleccion, variable donde guardar los datos y nombre del campo por el que se ordenara
    firebase_read("votantes", setOriginal, "index");
  }, []);

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
        <div className=" mt-10 ">
          {data.map((item, index) => (
            <div className="grid grid-cols-6" key={index}>
              <div>{item.nombre}</div>
              <div>{item.apellido}</div>
              <div>{item.voto}</div>
              <div>{item.mesa}</div>
              <div>{item.centro}</div>
              <div>{item.dirigente}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
