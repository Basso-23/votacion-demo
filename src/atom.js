import { atom } from "jotai";

//* Variable para el current user
export const userAtom = atom(undefined);

//* Variable para lista de todos los usuarios registrados
export const userListAtom = atom([]);
