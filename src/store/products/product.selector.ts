import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ProductState } from "./product.state";

const productState = (state: RootState) => state.products;

export const selectProducts = createSelector(
  productState,
  (productState: ProductState) => productState.products
);

// Selector para obtener el juego seleccionado
export const currentProduct = createSelector(
  productState,
  (productState: ProductState) => productState.currentProduct
);

export const loading = createSelector(productState, (state) => {
  return state.loading;
});
