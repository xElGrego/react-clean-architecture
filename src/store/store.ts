import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import productReducer from "./products/product.slice";

export const store = configureStore({
  reducer: {
    products: productReducer,
  },
});

/* Estado raiz */
export type RootState = ReturnType<typeof store.getState>;
/* Para dispatchar acciones */
export type AddDispatch = typeof store.dispatch;
/* devuelve una función para despachar acciones con el tipo correcto */
export const useAppDispatch = () => useDispatch<AddDispatch>();
/* devuelve una función que permite seleccionar un slice del estado utilizando el tipo correcto */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
