import { Product } from "../../domain/models/product.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { initialState, ProductState } from "./product.state";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "./product.actions";

/* Actions */

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    selectProduct: (state, action) => {
      state.currentProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state: ProductState) => {
      state.loading = true;
    });
    /* OBTENER PRODUCTOS */
    builder.addCase(
      getProducts.fulfilled,
      (state: ProductState, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(getProducts.rejected, (state: ProductState) => {
      state.loading = false;
      state.errors = "Error, la aplicación ha fallado";
    });
    /* CREAR PRODUCTO*/
    builder.addCase(createProduct.pending, (state: ProductState) => {
      /* state.loading = true; */
    });
    builder.addCase(
      createProduct.fulfilled,
      (state: ProductState, action: PayloadAction<Product>) => {
        const newProduct = action.payload;
        state.products.push(newProduct);
        state.loading = false;
      }
    );
    builder.addCase(createProduct.rejected, (state: ProductState) => {
      state.loading = false;
      state.errors = "Error, la aplicación ha fallado al crear el producto";
    });

    /* ACTUALIZAR PRODUCTO*/
    builder.addCase(updateProduct.pending, (state: ProductState) => {
      /* state.loading = true; */
    });
    builder.addCase(
      updateProduct.fulfilled,
      (state: ProductState, action: PayloadAction<Product>) => {
        const updatedProduct = action.payload;
        state.products = state.products.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        );
        state.loading = false;
      }
    );
    builder.addCase(updateProduct.rejected, (state: ProductState) => {
      state.loading = false;
      state.errors =
        "Error, la aplicación ha fallado al actualizar el producto";
    });

    /* ELIMINAR PRODUCTO*/
    builder.addCase(deleteProduct.pending, (state: ProductState) => {
      state.loading = true;
    });
    builder.addCase(
      deleteProduct.fulfilled,
      (state: ProductState, action: PayloadAction<Product>) => {
        state.loading = false;
        const deletedProduct = action.payload;
        state.products = state.products.filter(
          (product: Product) => product.id !== deletedProduct.id
        );
      }
    );
    builder.addCase(deleteProduct.rejected, (state: ProductState) => {
      state.loading = false;
      state.errors = "Error, la aplicación ha fallado al eliminar el producto";
    });
  },
});
export default productSlice.reducer;
export const { selectProduct, setProducts } = productSlice.actions;
