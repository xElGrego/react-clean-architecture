import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
  DialogActions,
  Container,
  Grid,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { MouseEvent, useState, FC, useEffect } from "react";
import { Product } from "../../../../domain/models/product.model";
import { useSelector } from "react-redux";
import {
  currentProduct,
  loading,
} from "../../../../store/products/product.selector";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import {
  createProduct,
  selectProduct,
  updateProduct,
} from "../../../../store/products/product.slice";

type MuiDialogProps = {
  openProp: boolean;
  closeProp: () => void;
};

export const MuiDialog: FC<MuiDialogProps> = ({ openProp, closeProp }) => {
  const handleButtonClick = () => {
    dispatch(selectProduct(null));
    closeProp();
  };

  const dispatch = useAppDispatch();
  const selectedProduct = useAppSelector(currentProduct);

  const [title, setTitle] = useState<string>("Creando producto");
  const [titleButton, setTitleButton] = useState<string>("Agregar");

  const loadings = useSelector(loading);

  useEffect(() => {
    if (selectedProduct) {
      setTitle("Editando juego");
      setTitleButton("Actualizar");
      setProduct({
        id: selectedProduct.id,
        name: selectedProduct.name,
        description: selectedProduct.description,
      });
    }
  }, [selectedProduct]);

  const [product, setProduct] = useState({
    id: 0,
    name: "",
    description: "",
  });

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data: Product = {
      id: product.id,
      name: product.name,
      description: product.description,
    };

    if (selectedProduct) {
      console.log("Update");
      dispatch(updateProduct(data));
    } else {
      console.log("Creando");
      dispatch(createProduct(data));
    }

    setProduct({
      id: 0,
      name: "",
      description: "",
    });

    handleButtonClick();
  };

  return (
    <>
      <Dialog
        open={openProp}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <div onClick={handleButtonClick}>
          <DialogTitle onClick={(e) => e.stopPropagation()} id="dialog-title">
            {title}
          </DialogTitle>
          <DialogContent onClick={(e) => e.stopPropagation()}>
            <Container sx={{ marginTop: 1 }}>
              <Grid sx={{ margin: "0 auto" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      onChange={(e) =>
                        setProduct({ ...product, name: e.target.value })
                      }
                      value={product.name}
                      fullWidth
                      label="name"
                      onClick={(e) => e.stopPropagation()} // Agrega esta línea para detener la propagación del evento
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      onChange={(e) =>
                        setProduct({ ...product, description: e.target.value })
                      }
                      value={product.description}
                      fullWidth
                      label="description"
                      onClick={(e) => e.stopPropagation()} // Agrega esta línea para detener la propagación del evento
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      onClick={handleSubmit}
                      fullWidth
                      variant="contained"
                      disableElevation
                      sx={{ bgcolor: "#d2006e" }}
                    >
                      {titleButton}
                    </Button>
                  </Grid>

                  {loadings && (
                    <Box
                      sx={{
                        mt: 5,
                        width: "100%",
                        textAlign: "center",
                      }}
                    >
                      <CircularProgress />
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Container>
          </DialogContent>
        </div>
        <DialogActions>
          <Button onClick={handleButtonClick}>Cancelar</Button>
          {/*  <Button onClick={ } autoFocus>
            Guardar
          </Button> */}
        </DialogActions>
      </Dialog>
    </>
  );
};
