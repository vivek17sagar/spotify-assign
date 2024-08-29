import { Box, Typography } from "@mui/material";
import { useState } from "react";

const Sidebar = ({ active, setActive,isVisible,setIsVisible }) => {
  return (
    <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
    <Box
      sx={{
        display: "flex",
        gap: "20px",
        color: "white",
        marginBottom: "20px",
        cursor: "pointer",
        marginTop:"20px"
      }}
    >
      <Typography
        sx={
          active == 0
            ? { fontWeight: "700", fontSize: "24px", fontFamily: "Inter" }
            : {
                fontWeight: "700",
                fontSize: "24px",
                fontFamily: "Inter",
                opacity: "50%",
              }
        }
        onClick={() => setActive(0)}
      >
        For You
      </Typography>
      <Typography
        sx={
          active == 1
            ? { fontWeight: "700", fontSize: "24px", fontFamily: "Inter" }
            : {
                fontWeight: "700",
                fontSize: "24px",
                fontFamily: "Inter",
                opacity: "50%",
              }
        }
        onClick={() => setActive(1)}
      >
        Top Tracks
      </Typography>
    </Box>
    {isVisible && <p style={{color:"white",fontFamily:"Inter",opacity:"90%",fontWeight:"500"}} onClick={()=>setIsVisible(!isVisible)}>Go Back</p>}

    </Box>
  );
};

export default Sidebar;
