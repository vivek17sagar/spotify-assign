import { Box, Typography } from "@mui/material";
import { useState } from "react";

const Sidebar = ({ active, setActive }) => {
  console.log(active);
  return (
    <Box
      sx={{
        display: "flex",
        gap: "20px",
        color: "white",
        marginBottom: "25px",
        cursor: "pointer",
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
  );
};

export default Sidebar;
