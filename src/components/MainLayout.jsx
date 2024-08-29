import { Box } from "@mui/material";
import Logo from "../assets/Logo.svg";
import Profile from "../assets/Profile.png";
import { Songs } from "./Song-component/Songs";
import { useState } from "react";
import "./MainLayout.css";

const MainLayout = () => {
  const [bgColor, setBgColor] = useState("#160D5E");

  const handleColor = (color) => {
    console.log("color ==> ", color);
    setBgColor(color);
  };

  return (
    <Box
      sx={{
        transition: "all 1s ease-out",
        display: "flex",
        justifyContent: "space-between",
        width: "100vw",
        height: "100vh",
        background: `linear-gradient(to bottom right, ${bgColor}, 	#28282B)`,
      }}
    >
      <Box
      className="mainLayoutConatiner"
      
      >
        <div>
          <img src={Logo} width="133.31px" height="40px" alt="Logo" />
        </div>

        <div>
          <img src={Profile} width="48px" height="48px" alt="Profile" />
        </div>
      </Box>
      <Box sx={{ width: "85%",overflow:"hidden" }}>
        <Songs handleColor={handleColor} />
      </Box>
    </Box>
  );
};

export default MainLayout;
