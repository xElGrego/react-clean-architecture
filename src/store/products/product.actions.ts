import { createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../../domain/models/product.model";
import axios from "axios";
import { toast } from "react-toastify";

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
      toast.success("El producto se eliminó");
      return data;
    } catch (error) {
      toast.error("Error al eliminar el juego");
      return thunkAPI.rejectWithValue(error);
    }
  }
);
