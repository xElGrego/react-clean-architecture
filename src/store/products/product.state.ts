import { Product } from "../../domain/models/product.model";

export interface ProductState {
  products: Product[];
  loading: boolean;
  currentProduct: Product | null;
  errors: string;
}

export const initialState: ProductState = {
  products: [],
  currentProduct: null,
  loading: false,
  errors: "",
};
