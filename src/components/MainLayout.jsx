import { Box } from "@mui/material";
import Logo from "../assets/Logo.svg";
import Profile from '../assets/Profile.png';
import { Songs } from "./Song-component/Songs";
import { useState } from "react";

const MainLayout = () => {
  const [bgColor, setBgColor] = useState("#160D5E");

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        height: "100vh",
        background: `linear-gradient(to bottom right, ${bgColor}, #8C6D3C)`,
        transition: "background 4s ease", // Corrected property name
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "1rem",
        }}
      >
        <div>
          <img src={Logo} width="133.31px" height="40px" alt="Logo" />
        </div>
    
        <div>
          <img src={Profile} width="48px" height="48px" alt="Profile" />
        </div>
      </Box>
      <Box>
        <Songs setBgColor={setBgColor} />
      </Box>
    </Box>
  );
};

export default MainLayout;
