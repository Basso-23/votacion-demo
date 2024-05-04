import React, { useState, useEffect } from "react";
import Question from "@/assets/icons/Question";
import { useAtom } from "jotai";
import { userAtom } from "@/atom";
import { adminAtom } from "@/atom";
import CreateModal from "@/components/createModal";

const Banner = () => {
  const [currentUser, setCurrentUser] = useAtom(userAtom);
  const [isAdmin, setIsAdmin] = useAtom(adminAtom);

  return (
    <section className=" w-full rounded-sm overflow-hidden shadow text-sm mb-10  ">
      {/*//* Nota */}
      <div className="w-full bg-[#CFEEFF] text-[#125486] py-3 px-3 flex font-medium">
        <span className="mr-[4px] mt-[1px] text-[17px]">
          <Question />
        </span>
        <div className="text-[13px]">
          Nota: Su cuenta tiene permisos como{" "}
          {isAdmin ? (
            <strong>administrador</strong>
          ) : (
            <strong>dirigente</strong>
          )}
        </div>
      </div>

      <div className="w-full bg-white text-[13px] py-4 px-3">
        {/*//* Current user */}
        <h1 className=" mb-4">
          <span> Sesión iniciada con la cuenta: </span>
          <span className="font-semibold lowercase">{currentUser}</span>
        </h1>
        {/*//* Crear button */}
        <CreateModal />
      </div>
    </section>
  );
};

export default Banner;
