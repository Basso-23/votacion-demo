import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@/atom";
import { adminAtom } from "@/atom";
import Question from "@/assets/icons/Question";

const Banner = () => {
  const [currentUser, setCurrentUser] = useAtom(userAtom);
  const [isAdmin, setIsAdmin] = useAtom(adminAtom);
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
          className="md:max-w-[150px] w-full submit_btn"
        >
          <div className="text-[13px]">Registrar votante</div>
        </button>
      </div>
    </section>
  );
};

export default Banner;
