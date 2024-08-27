import { Box, Typography } from "@mui/material"

const Sidebar = () => {
  return (
    <Box sx={{display:"flex",gap:"10px",color:"white"}}>
        <Typography sx={{fontWeight:"700",fontSize:"24px",fontFamily:"Inter"}}>For You</Typography>
        <Typography sx={{fontWeight:"700",fontSize:"24px",fontFamily:"Inter"}}>Top Tracks</Typography>
    </Box>
  )
}

export default Sidebar