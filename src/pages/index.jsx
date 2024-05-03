import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@/atom";

const App = () => {
  const [currentUser, setCurrentUser] = useAtom(userAtom);

  return (
    <main>
      <div>dadadad</div>
      <div>{currentUser}</div>
    </main>
  );
};

export default App;
