import { atom } from "jotai";

//* Variable para el current user
export const userAtom = atom(undefined);

//* Variable para identificar si es admin
export const adminAtom = atom(false);

//* Variable para abrir y cerrar modal de crear
export const createAtom = atom(false);
