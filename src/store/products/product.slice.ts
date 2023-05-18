import axios from "axios";
import { Product } from "../../domain/models/product.model";
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import { initialState, ProductState } from "./product.state";
import { log } from "console";

/* Actions */

export const getProducts = createAsyncThunk<Product[]>(
  "[Product] GetProducts",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      return response.data;
    } catch (error) {
      toast.error("Error al obtener los productos");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createProduct = createAsyncThunk<Product, Product>(
  "[GamesPage] CreateGame",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:3000/products", data);
      console.log("Response create", response);
      toast.success("El juego se ha creado con éxito");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateProduct = createAsyncThunk<Product, Product>(
  "[GamesPage] UpdateGame",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/products/${data.id}`,
        data
      );
      console.log("RESPONSE put", response);
      return response.data;
    } catch (error) {
      console.log("Error aqui", error);

      toast.error("Error al actualizar el juego");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteProduct = createAsyncThunk<Product, Product>(
  "[GamesPage] DeleteGame",
  async (data, thunkAPI) => {
    console.log("delete", data);

    try {
      const response = await axios.delete(
        `http://localhost:3000/products/${data.id}`
      );
      console.log("response", response);
      return data;
    } catch (error) {
      toast.error("Error al eliminar el juego");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

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
