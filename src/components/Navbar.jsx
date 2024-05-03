import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@/atom";

const Navbar = () => {
  const [currentUser, setCurrentUser] = useAtom(userAtom);

  const regex = /@admin\.com$/;
  const isValid = regex.test(currentUser);

  useEffect(() => {
    if (isValid) {
      console.log("es admin");
    } else {
      console.log("es dirigente");
    }
  }, []);

  return (
    <main className=" w-full fixed border-b">
      <section className="pageSize flex justify-between sm:py-4 py-2">
        <div
          className="bg-contain bg-center w-[120px] aspect-[10/3] bg-no-repeat"
          style={{
            backgroundImage: "url('https://i.imgur.com/KePacDj.png')",
          }}
        ></div>
        <div className="flex">
          <div></div>
        </div>
      </section>
    </main>
  );
};

export default Navbar;
