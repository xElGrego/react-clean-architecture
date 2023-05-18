import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Typography,
  styled,
} from "@mui/material";

import { FC, useEffect, useState } from "react";

import { Product } from "../../../domain/models/product.model";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  deleteProduct,
  getProducts,
  selectProduct,
  setProducts,
} from "../../../store/products/product.slice";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { MuiDialog } from "./components/product.modal";
import { Delete, Edit } from "@mui/icons-material";

export const ProductsPage: FC = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useAppDispatch();

  const loading = useAppSelector((state) => state.products.loading);

  const products = useAppSelector((state) => state.products.products);

  /* Obtener productos */
  useEffect(() => {
    //Cambiando
    dispatch(getProducts());

    console.log(products);
  }, []);

  const handleEditClick = (product: Product) => {
    dispatch(selectProduct(product));
    setOpen(true);
  };

  const handleDeleteClick = (product: Product) => {
    // Lógica para manejar el clic en el botón de eliminación}
    dispatch(deleteProduct(product));
    console.log("Eliminar elemento con ID:", product.id);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 160 },
    {
      field: "name",
      headerName: "Name",
      width: 400,
    },
    {
      field: "description",
      headerName: "Description",
      width: 430,
    },
  ];

  return (
    <Box sx={{ mt: 10 }}>
      {products.length > 0 && (
        <Box>
          <Container>
            <Box
              sx={{
                justifyContent: "space-between",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant="h4" fontWeight={"bold"}>
                Productos
              </Typography>
              <MuiDialog openProp={open} closeProp={handleClose} />

              <Button
                variant="contained"
                disableElevation
                sx={{ flexShrink: 0, bgcolor: "#d2006e" }}
                onClick={handleClickOpen}
              >
                Agregar
              </Button>
            </Box>

            <Box sx={{ height: "auto", width: "100%", mt: "10px" }}>
              <div style={{ width: "100%" }}>
                <DataGrid
                  rows={products}
                  columns={[
                    ...columns,
                    {
                      field: "actions",
                      headerName: "Acciones",
                      width: 120,
                      disableColumnMenu: true,
                      sortable: false,
                      renderCell: (params) => (
                        <>
                          <IconButton
                            aria-label="Editar"
                            onClick={() => handleEditClick(params.row)}
                          >
                            <Edit style={{ color: "#d2006e" }} />
                          </IconButton>
                          <IconButton
                            aria-label="Eliminar"
                            onClick={() => handleDeleteClick(params.row)}
                          >
                            <Delete />
                          </IconButton>
                        </>
                      ),
                    },
                  ]}
                  style={{ width: "100%" }}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 5,
                      },
                    },
                  }}
                  pageSizeOptions={[5]}
                />
              </div>
            </Box>
          </Container>
        </Box>
      )}

      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};
