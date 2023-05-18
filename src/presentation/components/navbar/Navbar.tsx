import {
  Container,
  Typography,
  styled,
  Box,
  ListItem,
  ListItemIcon,
  ListItemButton,
  List,
  Drawer,
  ListItemText,
} from "@mui/material";
import { FC, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import { Home, MiscellaneousServices } from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

export const Navbar: FC = () => {
  const navigate = useNavigate();

  const [mobileMeu, setMobileMMenu] = useState({
    left: false,
  });

  const toogleDrawer = (anchor: string, open: boolean) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.type === "Tab" || event.type === "Shift")
    ) {
      return;
    }
    setMobileMMenu({ ...mobileMeu, [anchor]: open });
  };

  const handleItemClick = (text: string) => {
    if (text === "Home") {
      navigate("/");
    } else if (text === "Products") {
      navigate("/products");
    }
  };

  const list = (anchor: string): JSX.Element => {
    return (
      <Box
        sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
        role="presentation"
        onClick={toogleDrawer(anchor, false)}
        onKeyDown={toogleDrawer(anchor, false)}
      >
        <List>
          {["Home", "Products", "Post"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => handleItemClick(text)}>
                <ListItemIcon>
                  {index === 0 && <FeaturedPlayListIcon />}
                  {index === 1 && <Home />}
                  {index === 2 && <MiscellaneousServices />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    );
  };

  const NavLink = styled(Typography)(() => ({
    fontSize: "14px",
    color: "#fff",
    fontWeigth: "bold",
    cursor: "pointer",
    "&:hover": {
      color: "#fff",
    },
  }));

  const NavbarLinksBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  const CustomMenuIcon = styled(MenuIcon)(({ theme }) => ({
    cursor: "pointer",
    display: "none",
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
  }));

  const NavbarContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    backgroundColor: "#d2006e",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(2),
    },
  }));

  const NavbarLogo = styled("img")(({ theme }) => ({
    cursor: "pointer",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  const toProducts = () => {
    navigate("/products");
  };

  const toHome = () => {
    navigate("/");
  };

  const toPost = () => {
    navigate("/post");
  };

  return (
    <NavbarContainer>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CustomMenuIcon onClick={toogleDrawer("left", true)} />
          <Drawer
            anchor="left"
            open={mobileMeu["left"]}
            onClose={toogleDrawer("left", false)}
          >
            {list("left")}
          </Drawer>
          <Box onClick={toHome}>
            <NavbarLogo
              src="https://www.bancoguayaquil.com/documents/images/logo_bg_white.png"
              style={{ height: "40px" }}
              alt="logo"
            />
          </Box>
        </Box>
      </Box>

      <NavbarLinksBox sx={{ marginRight: "70px" }}>
        <NavLink onClick={toProducts}>
          <Typography sx={{ fontSize: "1.6em" }}>Productos</Typography>
        </NavLink>
        <NavLink variant="body1" onClick={toPost}>
          <Typography sx={{ fontSize: "1.6em" }}>Post</Typography>
        </NavLink>
      </NavbarLinksBox>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <NavLink variant="body2">Ingresar</NavLink>
      </Box>
    </NavbarContainer>
  );
};
