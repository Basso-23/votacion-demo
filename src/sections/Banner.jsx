import React, { useState, useEffect } from "react";
import Question from "@/assets/icons/Question";
import { useAtom } from "jotai";
import { userAtom } from "@/atom";
import { adminAtom } from "@/atom";
import { createAtom } from "@/atom";

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
  const [createModal, setCreateModal] = useAtom(createAtom);
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
        {/*//* Registrar votante button */}
        <button
          style={{ paddingBottom: "13px", paddingTop: "13px" }}
          className="md:max-w-[150px] w-full submit_btn hidden"
        >
          <div className="text-[13px]">Registrar votante</div>
        </button>

        <AlertDialog>
          <AlertDialogTrigger>Open</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </section>
  );
};

export default Banner;
