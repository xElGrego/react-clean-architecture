import { FC } from "react";
import { Box, Typography, styled } from "@mui/material";

type TitleComponentProp = {
  title: string;
};

export const TitleComponent: FC<TitleComponentProp> = ({ title }) => {
  const CustomBox = styled(Box)(() => ({
    display: "flex",
    height: "80vh",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  }));

  return (
    <CustomBox>
      <Box>
        <Typography sx={{ fontSize: "25px" }}>{title}</Typography>
      </Box>
    </CustomBox>
  );
};
