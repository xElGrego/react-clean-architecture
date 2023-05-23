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

  const list = (anchor: string): JSX.Element => {
    return (
      <Box
        sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
        role="presentation"
        onClick={toogleDrawer(anchor, false)}
        onKeyDown={toogleDrawer(anchor, false)}
      >
        <List>
          {["Home", "Post", "Products"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
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

  const NavbarLinksBox = styled(Typography)(({ theme }) => ({
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
    alignItems: "center",
    backgroundColor: "#d2006e",
    color: "#fff",
    justifyContent: "space-between",
    padding: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(2),
    },
  }));

  const NavbarLogo = styled("img")(({ theme }) => ({
    cursor: "pointer",
    height: "50px",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  const navigate = useNavigate();

  const navigatePost = (ruta: string) => {
    navigate(`/${ruta}`);
  };

  return (
    <NavbarContainer>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "2.5rem",
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
          <NavbarLogo
            src="https://www.bancoguayaquil.com/documents/images/logo_bg_white.png"
            alt="logo"
            onClick={() => navigatePost("")}
          />
        </Box>
        <NavbarLinksBox>
          <NavLink variant="body2" onClick={() => navigatePost("post")}>
            Post
          </NavLink>
          <NavLink variant="body2" onClick={() => navigatePost("products")}>
            Products
          </NavLink>
        </NavbarLinksBox>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <NavLink variant="body2">Ingresar</NavLink>
        {/* <Button backgroundColor="#0F1B4C" color="#fff" buttonText="Register" /> */}
      </Box>
    </NavbarContainer>
  );
};
